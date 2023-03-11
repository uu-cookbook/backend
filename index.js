const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

var app = express();
app.use(express.json());


dotenv.config();

const db = require("./db");

// Express setings
const hostname = "0.0.0.0";
const port = process.env.PORT || 5000;

// Connection URL
const mongo_uri = process.env.MONGO_URI

// This responds with "Hello World" on the homepage
app.get("/v3", (req, res) => {
    console.log("Got a GET request for the homepage");
    res.send("api V3");
});

app.get("/v3/users", (req, res) => {
    db.getUsers(mongo_uri).then((value) => {
        res.send(value);
    });
});

app.post("/v3/login", (req, res) => {
    console.log("login post")
    console.log("req.body", req.body);
    if (req.body.email) {
        console.log(req.body.email)
        db.getUser(mongo_uri,req.body.email).then((value) => {
            res.send({status:"ok",user:value})
        }
        )
        
    }
    else{
        res.send({ status: "invalid data"});
    }
});

var server = app.listen(port, hostname, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
