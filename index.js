const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var cors = require('cors')
const multer = require('multer');
const upload = multer();


var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(cors())


dotenv.config();

const db = require("./db");
const auth = require("./auth.js");
const cookbook = require("./cookbook.js");

app.use("/v3/",auth)
app.use("/v3/",cookbook)


// Express setings
const hostname = "0.0.0.0";
const port = process.env.PORT || 5000;

// Connection URL
const mongo_uri = process.env.MONGO_URI

//USERS route

app.get("/v3/users", (req, res) => {
    db.getUsers(mongo_uri).then((value) => {
        res.send(value);
    });
});

var server = app.listen(port, hostname, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
