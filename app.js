const express = require("express");
const app = express();
const port = 9000;

// DB 연결
const connect = require("./schemas");
connect();

app.get('/', (req, res) => {
    res.send("Hello Jinyong!");
})

app.listen(port, () => {
    console.log(port, "Server is running!");
});