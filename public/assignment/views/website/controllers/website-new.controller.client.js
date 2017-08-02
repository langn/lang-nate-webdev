(function() {
    angular.module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var model = this;

        model.createNewWebsite = createNewWebsite;

        var userId = $routeParams["uid"];
        function init() {
            model.emptyFields = false;
        }
        init();

        function createNewWebsite(website) {
            if (!website || !(website.name && website.description)) {
                model.emptyFields = true;
            } else {
                WebsiteService.createWebsite(userId, website)
                    .then(function(website){
                        $location.path('/user/' + userId + '/website');
                    });
            }
        }
    }

})();
