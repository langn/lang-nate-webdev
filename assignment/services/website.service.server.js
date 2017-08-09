var app = require("../../express");
var _ = require('lodash');
var websiteModel = require('../model/website.model.server');

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findAllWebsitesForUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);

function createWebsite(req, res) {
    var website = req.body;
    var developerId = req.params.userId;

    websiteModel.createWebsiteForUser(developerId, website)
        .then(function(response) {
            return res.status(201).json(response);
        }).catch(function(error) {
            return res.status(500).json('Error creating website for user ' + error);
    });
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params.userId;
    websiteModel.findAllWebsitesForUser(userId)
        .then(function(response) {
            if (response === []) {
                return res.sendStatus(404);
            } else {
                return res.status(200).json(response);
            }
        }).catch(function(error) {
            return res.status(500).json('Error fetching sites for user ' + error);
    });
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel.findWebsiteById(websiteId)
        .then(function(response) {
            if (!response) {
                return res.sendStatus(404);
            } else {
                return res.status(200).json(response);
            }
        }).catch(function(error) {
        return res.status(500).json('Error fetching website by id ' + error);
    });
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    websiteModel.updateWebsite(websiteId, website)
        .then(function() {
            return res.sendStatus(204);
        }).catch(function(error) {
            return res.status(500).json('Error updating website ' + error);
    });
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel.deleteWebsite(websiteId)
        .then(function() {
            return res.sendStatus(204);
        }).catch(function(error) {
        return res.status(500).json('Error deleting website ' + error);
    });
}
