(function() {
    angular.module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        this.createWebsite = createWebsite;
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function createWebsite(userId, website) {
            return $http.post("/api/user/" + userId + "/website", website)
                .then(function(response) {
                    return response.data;
                });
        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/" + userId + "/website")
                .then(function(response) {
                    if (response.status === 200) {
                        return response.data;
                    } else {
                        return [];
                    }
                });
        }

        function findWebsiteById(websiteId) {
            return $http.get("/api/website/" + websiteId)
                .then(function(response) {
                    if (response.status === 200) {
                        return response.data;
                    } else {
                        return null;
                    }
                })
        }

        function updateWebsite(websiteId, website) {
            return $http.put("/api/website/" + websiteId, website);
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/" + websiteId);
        }
    }
})();