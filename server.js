const express= require('express');
const app =express();

app.use(express.json());
app.listen(3005, () => {
    console.log("this server on 3005");
})