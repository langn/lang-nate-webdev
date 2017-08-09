var app = require("../../express");
var _ = require('lodash');
var userModel = require('../model/user.model.server');

app.post("/api/user", createUser);
app.get("/api/user", findUser);
app.get("/api/user/:userId", findUserById);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

//Creates the given user
function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
        .then(function(response) {
            return res.status(201).json(response);
        }).catch(function(error) {
            console.error('Error creating user' + error);
            return res.status(500).json('Failed to create user');
    });

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
    var userId = req.params.userId;
    userModel.findUserById(userId)
        .then(function(response) {
            if (!response) {
                return res.sendStatus(404);
            } else {
                return res.status(200).json(response);
            }
        }).catch(function(error) {
            console.error('Error finding user' + error);
            return res.status(500).json('Failed to find user');
    });
}

//Finds the given user by username
function findUserByUsername(req, res, username) {
    userModel.findUserByUsername(username)
        .then(function(response) {
            if (!response) {
                return res.sendStatus(404);
            } else {
                return res.status(200).json(response);
            }
        }).catch(function(error) {
        console.error('Error finding user' + error);
        return res.status(500).json('Failed to find user');
    });
}

//Finds the given user by their login credentials
function findUserByCredentials(req, res, username, password) {
    userModel.findUserByCredentials(username, password)
        .then(function(response) {
            if (!response) {
                return res.sendStatus(404);
            } else {
                return res.status(200).json(response);
            }
        }).catch(function(error) {
        console.error('Error finding user' + error);
        return res.status(500).json('Failed to find user');
    });
}

//Updates the user with the given user id
function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel.updateUser(userId, user)
        .then(function() {
            return res.sendStatus(204);
        }).catch(function(error) {
            console.error('Error updating user' + error);
            return res.sendStatus(500);
    });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel.deleteUser(userId)
        .then(function() {
            return res.sendStatus(204);
        }).catch(function(error) {
        console.error('Error deleting user' + error);
        return res.sendStatus(500);
    });
}

