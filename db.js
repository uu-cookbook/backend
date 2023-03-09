const { MongoClient } = require("mongodb");

const uri =
    "mongodb://vpetras:fM3dgeN4MjHIf7qThF9m3kEg@0.0.0.0:27017/?authMechanism=DEFAULT";

async function getUsers() {
    const client = new MongoClient(uri);
    const database = client.db("CookBook");
    const collection = database.collection("Users");
    const query = {};
    var users = await collection.find(query).toArray();
    client.close();
    return users;
}

module.exports = { getUsers };

//getUsers().then((value) => {
//    console.log(value);
//});
