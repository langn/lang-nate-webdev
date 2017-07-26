(function() {
    angular.module("WebAppMaker")
        .controller("WebsiteListHeaderController", WebsiteListHeaderController);

    function WebsiteListHeaderController($routeParams, $location, WebsiteService) {
        var model = this;

        model.goToProfile = goToProfile;
        model.goToNewWebsite = goToNewWebsite;

        var userId = $routeParams["uid"];

        function init() {

        }
        init();

        function goToProfile() {
            $location.path('user/' + userId);
        }

        function goToNewWebsite() {
            $location.path('user/' + userId + '/website/new');
        }
    }

})();
