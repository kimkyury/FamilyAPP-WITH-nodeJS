require("dotenv").config();
const express= require('express');
const cors = require('cors') //front와 연결
const app =express();


/* connect Mysql */
const db = require("./models");
db.sequelize.sync();

console.log("mysql: ", process.env.MYSQL_USERNAME);


/* connect front */
corsOptions = { 
    origin: "http://127.0.0.1:3030" 
}
app.use(cors(corsOptions));


app.get('/', (req, res) => {
    res.send('Hello WITH')
})


const port = 3005
app.listen(port, () => {
    console.log("this server on 3005");
})