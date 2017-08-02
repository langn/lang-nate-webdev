var app = require("../../express");
var _ = require('lodash');

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findAllWebsitesForUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function createWebsite(req, res) {
    var website = req.body;
    website.developerId = req.params.userId;
    website._id = generateRandomId();
    websites.push(website);
    return res.status(201).json(website);
}

//Prevent id conflicts (this isn't too important bc will be implemented
//server-side next week
function generateRandomId() {
    var id = _.random(500, 50000000);
    return "" + id;
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params.userId;
    var matchedSites = _.filter(websites, {"developerId" : userId});
    if (_.isEmpty(matchedSites)) {
        return res.sendStatus(404);
    } else {
        return res.status(200).json(matchedSites);
    }
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    var website = _.find(websites, {"_id" : websiteId});
    if (!website) {
        return res.sendStatus(404);
    } else {
        return res.status(200).json(website);
    }
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    websites = _.reject(websites, {"_id" : websiteId});
    websites.push(website);
    return res.sendStatus(204);
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websites = _.reject(websites, {"_id": websiteId});
    return res.sendStatus(200);
}
