var app = require("../../express");
var _ = require('lodash');
var pageModel = require('../model/page.model.server');

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;

    pageModel.createPage(websiteId, page)
        .then(function(response) {
            return res.status(201).json(response);
        }).catch(function(error) {
        return res.status(500).json('Error creating page ' + error);
    });
}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;
    pageModel.findAllPagesForWebsite(websiteId)
        .then(function(response) {
            if (response === []) {
                return res.sendStatus(404);
            } else {
                return res.status(200).json(response);
            }
        }).catch(function(error) {
        return res.status(500).json('Error fetching pages for site ' + error);
    });
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    pageModel.findPageById(pageId)
        .then(function(response) {
            if (!response) {
                return res.sendStatus(404);
            } else {
                return res.status(200).json(response);
            }
        }).catch(function(error) {
        return res.status(500).json('Error fetching page by id ' + error);
    });
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    pageModel.updatePage(pageId, page)
        .then(function() {
            return res.sendStatus(204);
        }).catch(function(error) {
        return res.status(500).json('Error updating page ' + error);
    });
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    pageModel.deletePage(pageId)
        .then(function() {
            return res.sendStatus(204);
        }).catch(function(error) {
        return res.status(500).json('Error deleting page ' + error);
    });
}
