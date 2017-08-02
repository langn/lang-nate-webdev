var app = require("../../express");
var _ = require('lodash');

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widget.pageId = pageId;
    widget._id = generateRandomId();
    widgets.push(widget);
    return res.status(201).json(widget);
}

//Prevent id conflicts (this isn't too important bc will be implemented
//server-side next week
function generateRandomId() {
    var id = _.random(500, 50000000);
    return "" + id;
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;
    var matchedWidgets = _.filter(widgets, {"pageId": pageId});
    if (_.isEmpty(matchedWidgets)) {
        return res.sendStatus(404);
    } else {
        return res.status(200).json(matchedWidgets);
    }
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    var widget = _.find(widgets, {"_id": widgetId});
    if (!widget) {
        res.sendStatus(404);
    } else {
        res.status(200).json(widget);
    }
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    widgets = _.reject(widgets, {"_id": widgetId});
    widgets.push(widget);
    return res.sendStatus(204);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    widgets = _.reject(widgets, {"_id": widgetId});
    return res.sendStatus(204);
}
