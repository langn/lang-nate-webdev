(function() {
    angular.module("WebAppMaker").controller("PageListCtrl", PageListCtrl);

    function PageListCtrl($routeParams, $location, PageService) {
        var model = this;

        model.goToEditPage = goToEditPage;
        model.goToWidgets = goToWidgets;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];

        function init() {
            model.pages = PageService.findPagesByWebsiteId(websiteId);
        }
        init();

        function goToEditPage(page) {
            $location.path('user/' + userId + '/website/' + websiteId + '/page/' + page._id);
        }

        function goToWidgets(page) {
            $location.path('user/' + userId + '/website/' + websiteId + '/page/' + page._id + '/widget');
        }
    }

})();
