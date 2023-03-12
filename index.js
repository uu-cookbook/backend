const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var cors = require('cors')

var app = express();
app.use(express.json());
app.use(cors())


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
    console.log("login")
    console.log("req.body", req.body);
    if (req.body.email && req.body.password) {
        db.getUser(mongo_uri,req.body.email).then((user) => {
            if (user.length > 0) {
                bcrypt.compare(req.body.password, user[0].password, (err,result) => {
                    if (err) {
                        console.log(err)
                    }
                    if (result) {
                        // Send JWT
                        res.send({success: true, id:user[0]._id})
                      } else {
                        // response is OutgoingMessage object that server response http request
                        res.status(401).json({success: false, message: 'passwords do not match'});
                      }
                })
            }
            else {
                // No Content
                res.status(400).json({success: false, message: "User not exist" })
            }
        }
        )
        
    }
    else {
        // No Content
        res.sendStatus(204)
    }
});

app.post("/v3/register", (req, res) => {
    console.log("register")
    if (req.body.name && req.body.lastname && req.body.nickname && req.body.email && req.body.password) {
        db.checkNicknameEMail(mongo_uri, req.body.nickname, req.body.email).then ((check) => {
            console.log("check", check)
            if (check.nickname || check.email) {
                res.send(check)
            }
            else {
                bcrypt.hash(req.body.password, 10).then(hash => {
                    const timeElapsed = Date.now();
                    const timeNow = new Date(timeElapsed);
                    var user = {
                        name: req.body.name,
                        lastname: req.body.lastname,
                        nickname: req.body.nickname,
                        email: req.body.email,
                        password: hash,
                        registered: timeNow.toISOString(),
                        role: ["member"]
                    }
                    db.registerUser(mongo_uri,user).then((ret) =>
                        res.send({status: "registered"}))
                    })
                
            }
        })
    }
    else {
        // No Content
        res.sendStatus(204)
    }
});

var server = app.listen(port, hostname, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
