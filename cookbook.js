const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const multer = require('multer');
const path = require("path");

const storageEngine = multer.diskStorage({
      destination: "./images",
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
      },
    });

const checkFileType = function (file, cb) {
          //Allowed file extensions
          const fileTypes = /jpeg|jpg|png|gif|svg/;
        
          //check extension names
          const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        
          const mimeType = fileTypes.test(file.mimetype);
        
          if (mimeType && extName) {
            return cb(null, true);
          } else {
            cb("Error: You can Only Upload Images!!");
          }
        };

const upload = multer({
      storage: storageEngine,
      limits: { fileSize: 10000000 },
      fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
      },
    });



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

router.post("/add_recipe", upload.single("image"), (req, res) => {
    console.log(req.body)
    console.log(req.files)

    const image = req.body.image;

    console.log("add recipe")
    res.send({"status": "ok", "message": "add recipe", "data": req.body})
});


module.exports = router;