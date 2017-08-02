var app = require("../../express");
var _ = require('lodash');

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    page.websiteId = websiteId;
    page._id = generateRandomId();
    pages.push(page);
    return res.status(201).json(page);
}

//Prevent id conflicts (this isn't too important bc will be implemented
//server-side next week
function generateRandomId() {
    var id = _.random(500, 50000000);
    return "" + id;
}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var matchedPages = _.filter(pages, {"websiteId" : websiteId});
    if (_.isEmpty(matchedPages)) {
        return res.sendStatus(404);
    } else {
        return res.status(200).json(matchedPages);
    }
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    var page = _.find(pages, {"_id" : pageId});
    if (!page) {
        return res.sendStatus(404);
    } else {
        return res.status(200).json(page);
    }
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    pages = _.reject(pages, {"_id" : pageId});
    pages.push(page);
    return res.sendStatus(204);
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    pages = _.reject(pages, {"_id": pageId});
    return res.sendStatus(204);
}
