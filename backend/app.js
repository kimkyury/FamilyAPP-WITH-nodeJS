const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const scheduleRouter = require('./routes/schedule');
const schedulesRouter = require('./routes/schedules')
const postsRouter = require('./routes/posts')
const hashtagRouter = require('./routes/hashtag')
const postRouter = require('./routes/post');
const familiesRouter = require('./routes/families');
const folderRouter = require('./routes/folder');
const chatRouter = require('./routes/chat');
const chatsRouter = require('./routes/chats');
const specialRouter = require('./routes/special');
const specialsRouter = require('./routes/specials');
const app = express();

db.sequelize.sync({ force: false });
passportConfig();

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
}));
app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie('cookiesecret'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookiesecret',
    cookie: {
        httpOnly: true,
        secure: false,
    }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/schedule', scheduleRouter);
app.use('/schedules', schedulesRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/families', familiesRouter);
app.use('/hashtag', hashtagRouter);
app.use('/folder', folderRouter);
app.use('/chat', chatRouter);
app.use('/chats', chatsRouter);
app.use('/special', specialRouter);
app.use('/specials', specialsRouter);
const server = app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});
