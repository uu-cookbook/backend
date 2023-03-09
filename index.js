var express = require("express");
var app = express();

const db = require("./db");

// Express setings
const hostname = "0.0.0.0";
const port = process.env.NODE_PORT || 8020;

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

var server = app.listen(port, hostname, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
