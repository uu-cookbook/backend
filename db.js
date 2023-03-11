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
    console.log("email",email,typeof email)
    const query = {email: email};
    console.log("querry",query)
    var user = await collection.find(query).toArray();
    client.close();
    return user;
}

module.exports = { getUsers, getUser };

//getUsers().then((value) => {
//    console.log(value);
//});
