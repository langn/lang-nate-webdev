(function() {
    angular.module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var model = this;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        function init() {
            model.website = WebsiteService.findWebsiteById(websiteId);
            model.emptyFields = false;
        }
        init();

        function updateWebsite() {
            if (!model.website || !(model.website.name && model.website.description)) {
                model.emptyFields = true;
            } else {
                WebsiteService.updateWebsite(websiteId, model.website);
                $location.path('/user/' + userId + '/website');
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(websiteId);
            $location.path('/user/' + userId + '/website');
        }
    }

})();
