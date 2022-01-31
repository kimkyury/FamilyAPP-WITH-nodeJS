const passport = require('passport');
const local = require('./local');
const db = require('../models');
module.exports = () => {
    passport.serializeUser((user, done) => { // req.login.user 가 user로옴
        return done(null, user.id); // 서버의 메모리 부담을 줄이기위해 id만 저장
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await db.User.findOne({
                where: { id },
                attributes: ['id', 'nickname', 'color'],
            });
            console.log('user', user);
            return done(null, user); // req.user, req.isAuthenticated() === true, 로그인후 모든요청에 실행됨
        } catch (err) {
            console.error(err);
            return done(err);
        }

    });
    local();
}