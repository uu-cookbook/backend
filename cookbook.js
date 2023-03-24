const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const upload = multer()
const mw = require("./middlewares.js");
const dotenv = require('dotenv');
dotenv.config();



const db = require("./db");
const mongo_uri = process.env.MONGO_URI
const jwtSecretKey = process.env.JWT_SECRET_KEY;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }

router.get("/recipes", (req, res) => {
    db.getRecipes(mongo_uri).then((recipes) => {
        res.send(recipes)
    })
});

router.post("/recipe", (req, res) => {
    console.log(req.body)
    console.log("get recipes")
    res.send("get recipes")
});

// router.post("/add_recipe", upload.single("image"), (req, res) => {
router.post("/add_recipe", authenticateToken,upload.single("image"), (req, res) => {

    //console.log(req.body)
    console.log(req.file)
    var recipe = req.body
    recipe.author = {nickname: req.user.nickname, id: req.user._id}

    db.addRecipe(mongo_uri,recipe).then((ret) => {
        console.log("ret", ret)
        fs.writeFile("images/"+ret.id+".png", req.file.buffer, (err) => {
            console.error(err)
        })
        res.send({status: "registered", id: ret.id})
    })
});


module.exports = router;