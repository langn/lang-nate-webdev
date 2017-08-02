(function() {
    angular.module("WebAppMaker")
        .controller("PageListHeaderController", PageListHeaderController);

    function PageListHeaderController($routeParams, $location, PageService) {
        var model = this;

        model.goToWebsite = goToWebsite;
        model.goToNewPage = goToNewPage;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];

        function init() {

        }
        init();

        function goToWebsite() {
            $location.path('user/' + userId + '/website/');
        }

        function goToNewPage() {
            $location.path('user/' + userId + '/website/' + websiteId + '/page/new');
        }
    }

})();
