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

    return widgetModel.create(widget)
        .then(function(response) {
            pageModel.addWidget(pageId, response._id);
            return response;
        }).catch(function(error) {
            console.error('Error creating widget ' + error);
        });
}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({_page: pageId});
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

}