var app = require("../../express");

var _ = require('lodash');

app.post("/api/user", createUser);
app.get("/api/user", findUser);
app.get("/api/user/:userId", findUserById);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

var users = [
    { _id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
    { _id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
    { _id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
    { _id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }
];

//Creates the given user
function createUser(req, res) {
    var user = req.body;
    user._id = generateRandomId();
    users.push(user);
    return res.status(201).json(user);
}

//Prevent id conflicts (this isn't too important bc will be implemented
//server-side next week
function generateRandomId() {
    var id = _.random(500, 50000000);
    return "" + id;
}

//Dispatches to correct middleware based on the query string
function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    if (!username) {
        return res.sendStatus(400);
    } else if (username && password) {
        return findUserByCredentials(req, res, username, password);
    } else {
        return findUserByUsername(req, res, username);
    }
}

//Finds the given user by user id
function findUserById(req, res) {
    var uid = req.params.userId;
    var user = _.find(users, {'_id' : uid});
    if (!user) {
        return res.sendStatus(404);
    } else {
        return res.status(200).json(user);
    }
}

//Finds the given user by username
function findUserByUsername(req, res, username) {
    var user = _.find(users, {'username' : username});
    if (!user) {
        return res.sendStatus(404);
    }
    return res.status(200).json(user);
}

//Finds the given user by their login credentials
function findUserByCredentials(req, res, username, password) {
    var user = _.find(users, {'username' : username, 'password' : password});
    if (!user) {
        return res.sendStatus(404);
    } else {
        return res.status(200).json(user);
    }
}

//Updates the user with the given user id
function updateUser(req, res) {
    var uid = req.params.userId;
    var user = req.body;
    //Get users array with all of the other users and stick the updated user on it
    users = _.reject(users, {'_id' : uid});
    users.push(user);
    return res.sendStatus(204);
}

function deleteUser(req, res) {
    var uid = req.params.userId;
    users = _.reject(users, {'_id' : uid});
    return res.sendStatus(204);
}

