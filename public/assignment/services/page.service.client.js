(function() {
    angular.module("WebAppMaker")
        .service("PageService", PageService);

    function PageService($http) {
        this.createPage = createPage;
        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        function createPage(websiteId, page) {
            return $http.post("/api/website/" + websiteId + "/page", page)
                .then(function(response) {
                    return response.data;
                });
        }

        function findPagesByWebsiteId(websiteId) {
            return $http.get("/api/website/" + websiteId + "/page")
                .then(function(response) {
                    if (response.status === 200) {
                        return response.data;
                    } else {
                        return [];
                    }
                });
        }

        function findPageById(pageId) {
            return $http.get("/api/page/" + pageId)
                .then(function(response) {
                    if (response.status === 200) {
                        return response.data
                    } else {
                        return null;
                    }
                });
        }

        function updatePage(pageId, page) {
            return $http.put("/api/page/" + pageId, page);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/" + pageId);
        }
    }
})();