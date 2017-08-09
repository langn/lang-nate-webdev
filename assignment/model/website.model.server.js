var mongoose = require('mongoose');
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model("WebsiteSchema", websiteSchema);
var userModel = require('./user.model.server');

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;

module.exports = websiteModel;

function createWebsiteForUser(userId, website) {
    website._user = userId;

    return websiteModel.create(website)
        .then(function(response) {
            userModel.addWebsite(userId, response._id)
                .then(function() {
                    return response;
                })
        }).catch(function(error) {
            console.error('Error creating website ' + error);
    });
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user: userId});
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}


function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {$set: website});
}

function deleteWebsite(websiteId) {
    return websiteModel.findOneAndRemove({_id: websiteId})
        .then(function(response) {
            if (response._user) {
                userModel.deleteWebsite(response._user, websiteId);
            }
        }).catch(function(error) {
            console.error('Error deleting website ' + error);
        });
}

function addPage(websiteId, pageId) {
    return websiteModel.update(
        {_id: websiteId},
        {$push: {pages: pageId}});
}

function deletePage(websiteId, pageId) {
    return websiteModel.update(
        {_id: websiteId},
        {$pull: {pages: pageId}});
}
