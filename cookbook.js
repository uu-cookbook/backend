const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const upload = multer()


const db = require("./db");
const mongo_uri = process.env.MONGO_URI
const jwtSecretKey = process.env.JWT_SECRET_KEY;

router.get("/recipes", (req, res) => {
    console.log("get recipes")
    res.send("get recipes")
});

router.post("/recipe", (req, res) => {
    console.log(req.body)
    console.log("get recipes")
    res.send("get recipes")
});

// router.post("/add_recipe", upload.single("image"), (req, res) => {
router.post("/add_recipe", upload.single("image"), (req, res) => {

    //console.log(req.body)
    console.log(req.file)

    db.addRecipe(mongo_uri,req.body).then((ret) => {
        console.log("ret", ret)
        fs.writeFile("images/"+ret.id+".png", req.file.buffer, (err) => {
            console.error(err)
        })
        res.send({status: "registered", id: ret.id})
    })
    


    //console.log("add recipe")
    //res.send({"status": "ok", "message": "add recipe", "data": req.body})
});


module.exports = router;