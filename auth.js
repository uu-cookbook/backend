const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const db = require("./db");
const mongo_uri = process.env.MONGO_URI

// LOGIN route

router.post("/login", (req, res) => {
    console.log("login")
    //console.log("req.body", req.body);
    if (req.body.email && req.body.password) {
        db.getUser(mongo_uri,req.body.email).then((user) => {
            if (user.length > 0) {
                bcrypt.compare(req.body.password, user[0].password, (err,result) => {
                    if (err) {
                        console.log(err)
                    }
                    if (result) {
                        // Send JWT
                        // TODO
                        console.log("login successful")
                        res.send({success: true, id:user[0]._id})
                      } else {
                        // response is OutgoingMessage object that server response http request
                        res.status(401).json({success: false, message: 'Wrong password'});
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

// REGISTER route

router.post("/v3/register", (req, res) => {
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


module.exports = router;