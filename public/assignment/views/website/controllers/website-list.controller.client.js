(function() {
    angular.module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, $location, WebsiteService) {
        var model = this;

        model.goToEditWebsite = goToEditWebsite;
        model.goToWebsitePages = goToWebsitePages;

        var userId = $routeParams["uid"];

        function init() {
            model.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();

        function goToEditWebsite(website) {
            $location.path('user/' + userId + '/website/' + website._id)
        }

        function goToWebsitePages(website) {
            $location.path('user/' + userId + '/website/' + website._id + '/page');
        }
    }

})();
