var app = require("../../express");
var _ = require('lodash');
var multer = require('multer');
var widgetModel = require('../model/widget.model.server');

var upload = multer({dest: __dirname+'/../../public/uploads'});

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.put('/api/page/:pageId/widget', reorderWidgets);
app.delete('/api/widget/:widgetId', deleteWidget);
app.post('/api/upload', upload.single('myFile'),  uploadImage);

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;

    widgetModel.createWidget(pageId, widget)
        .then(function(response) {
            return res.status(201).json(response);
        }).catch(function(error) {
        return res.status(500).json('Error creating widget ' + error);
    });
}

function findAllWidgetsForPage(req, res) {
    var widgetId = req.params.pageId;
    widgetModel.findAllWidgetsForPage(widgetId)
        .then(function(response) {
            if (response === []) {
                return res.sendStatus(404);
            } else {
                return res.status(200).json(response);
            }
        }).catch(function(error) {
        return res.status(500).json('Error fetching widgets for page ' + error);
    });
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel.findWidgetById(widgetId)
        .then(function(response) {
            if (!response) {
                return res.sendStatus(404);
            } else {
                return res.status(200).json(response);
            }
        }).catch(function(error) {
        return res.status(500).json('Error fetching widget by id ' + error);
    });
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    widgetModel.updateWidget(widgetId, widget)
        .then(function() {
            return res.sendStatus(204);
        }).catch(function(error) {
        return res.status(500).json('Error updating widget ' + error);
    });
}

function reorderWidgets(req, res) {
    var initialPos = req.query.initial;
    var finalPos = req.query.final;
    var pageId = req.params.pageId;
    widgetModel.reorderWidget(pageId, initialPos, finalPos);
    return res.sendStatus(204);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel.deleteWidget(widgetId)
        .then(function() {
            return res.sendStatus(204);
        }).catch(function(error) {
        return res.status(500).json('Error deleting widget ' + error);
    });
}

function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var filename = myFile.filename;

    var widget = null;

    widgetModel.findWidgetById(widgetId)
        .then(function(response) {
            widget = response;
            widget.url = '/uploads/' + filename;
            return widgetModel.updateWidget(widgetId, widget)})
        .then(function() {
            var callbackUrl = "/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
            res.redirect(callbackUrl);
        });
}
