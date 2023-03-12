const { MongoClient } = require("mongodb");

async function getUsers(uri) {
    const client = new MongoClient(uri);
    const database = client.db("CookBook");
    const collection = database.collection("Users");
    const query = {};
    var users = await collection.find(query).toArray();
    client.close();
    return users;
}

async function getUser(uri, email) {
    const client = new MongoClient(uri);
    const database = client.db("CookBook");
    const collection = database.collection("Users");
    const query = {email: email};
    var user = await collection.find(query).toArray();
    client.close();
    return user;
}

async function checkNicknameEMail(uri, nickname, email) {
    const client = new MongoClient(uri);
    const database = client.db("CookBook");
    const collection = database.collection("Users");
    const queryEmail = {email: email};
    const queryNickname = {nickname: nickname};
    var userEmail = await collection.find(queryEmail).toArray();
    var userNickname = await collection.find(queryNickname).toArray();
    console.log("email", userEmail)
    console.log("nickname", userNickname)
    client.close();
    var emailFound = false
    var nicknameFound = false
    if (userEmail.length !== 0) {
        emailFound = true
    }
    if (userNickname.length !== 0) {
        nicknameFound = true
    }
    return {nickname: nicknameFound, email: emailFound};
}

async function registerUser(uri, user) {
    const client = new MongoClient(uri);
    const database = client.db("CookBook");
    const collection = database.collection("Users");
    var res = await collection.insertOne(user, (err, res) => {
        if (err) {
            return {status: "err"}
        }
        else {
            return {status: "ok"}
        }
    })

}

module.exports = { getUsers, getUser, checkNicknameEMail, registerUser};

//getUsers().then((value) => {
//    console.log(value);
//});
