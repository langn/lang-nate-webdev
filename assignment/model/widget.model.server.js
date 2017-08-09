var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var pageModel = require('./page.model.server');

var widgetModel = mongoose.model("WidgetModel", widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;

    return widgetModel.findOne().sort('-order')
        .then(function(response) {
            if (response && (response.order != null)) {
                widget.order = response.order + 1;
            } else {
                widget.order = 0;
            } return widgetModel.create(widget)
                .then(function(response) {
                    pageModel.addWidget(pageId, response._id);
                    return response;
                }).catch(function(error) {
                    console.error('Error creating widget ' + error);
                });
        });
}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({_page: pageId}).sort('order');
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(widgetId) {
    return widgetModel.findOneAndRemove({_id: widgetId})
        .then(function(response) {
            if (response._page) {
                pageModel.deleteWidget(response._page, widgetId);
            }
        }).catch(function(error) {
            console.error('Error deleting widget ' + error);
        });
}

function reorderWidget(pageId, start, end) {
    var firstWidget;
    var secondWidget;

    widgetModel.findOne({order: start, _page: pageId})
        .then(function(firstObject) {
            firstWidget = firstObject;
            return widgetModel.findOne({order: end, _page: pageId})
        }).then(function(secondObject) {
            secondWidget = secondObject;
            firstWidget.order = end;
            secondWidget.order = start;
            firstWidget.save();
            secondWidget.save();
    }).catch(function(error) {
        console.error('Error reordering objects ' + error);
    })
}