(function() {
    angular.module("WebAppMaker")
        .service("PageService", PageService);

    function PageService() {
        this.createPage = createPage;
        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = generateRandomId();
            pages.push(page);
        }

        //Prevent id conflicts (this isn't too important bc will be implemented
        //server-side next week
        function generateRandomId() {
            var id = _.random(500, 50000000);
            return "" + id;
        }

        function findPagesByWebsiteId(websiteId) {
            return _.filter(pages, {"websiteId" : websiteId});
        }

        function findPageById(pageId) {
            return _.find(pages, {"_id" : pageId});
        }

        function updatePage(pageId, page) {
            pages = _.reject(pages, {"_id" : pageId});
            pages.push(page);
        }

        function deletePage(pageId) {
            pages = _.reject(pages, {"_id": pageId});
        }
    }
})();