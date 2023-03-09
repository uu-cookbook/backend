var express = require("express");
var app = express();

const db = require("./db");

// Connection URL
const uri = "mongodb://136.244.82.171:27017/";

// This responds with "Hello World" on the homepage
app.get("/", function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send("Hello GET");
});

app.get("/users", function (req, res) {
    db.getUsers().then((value) => {
        res.send(value);
    });
});

app.post("/login", function (req, res) {
    console.log("req.body", req.body);
    res.send({ status: "ok" });
});

var server = app.listen(8020, "0.0.0.0", function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
