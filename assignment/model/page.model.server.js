var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require('./website.model.server');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;

module.exports = pageModel;

function createPage(websiteId, page) {
    page._website = websiteId;

    return pageModel.create(page)
        .then(function(response) {
            websiteModel.addPage(websiteId, response._id)
                .then(function() {
                    return response;
                })
        }).catch(function(error) {
            console.error('Error creating page ' + error);
        });
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId});
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {$set: page});
}

function deletePage(pageId) {
    return pageModel.findOneAndRemove({_id: pageId})
        .then(function(response) {
            if (response._website) {
                websiteModel.deletePage(response._website, pageId);
            }
        }).catch(function(error) {
            console.error('Error deleting page ' + error);
        });
}

function addWidget(pageId, widgetId) {
    return pageModel.update(
        {_id: pageId},
        {$push: {widgets: widgetId}});
}

function deleteWidget(pageId, widgetId) {
    return pageModel.update(
        {_id: pageId},
        {$pull: {widgets: widgetId}});
}
