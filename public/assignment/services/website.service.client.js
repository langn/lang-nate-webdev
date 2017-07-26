(function() {
    angular.module("WebAppMaker")
           .service("WebsiteService", WebsiteService);

    function WebsiteService() {
        this.createWebsite = createWebsite;
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        function createWebsite(userId, website) {
            website.developerId = userId;
            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            return _.filter(websites, {"developerId" : userId});
        }

        function findWebsiteById(websiteId) {
            return _.find(websites, {"_id" : websiteId});
        }

        function updateWebsite(websiteId, website) {
            websites = _.reject(websites, {"_id" : websiteId});
            websites.push(website);
        }

        function deleteWebsite(websiteId) {
            websites = _.reject(websites, {"_id": websiteId});
        }
    }
})();