(function() {
    angular.module("WebAppMaker")
        .controller("EditPageCtrl", EditPageCtrl);

    function EditPageCtrl($routeParams, $location, PageService) {
        var model = this;

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        function init() {
            model.page = PageService.findPageById(pageId);
            model.emptyFields = false;
        }
        init();

        function updatePage() {
            if (!model.page || !(model.page.name && model.page.title)) {
                model.emptyFields = true;
            } else {
                PageService.updatePage(pageId, model.page);
                $location.path('/user/' + userId + '/website/' + websiteId + '/page');
            }
        }

        function deletePage() {
            PageService.deletePage(pageId);
            $location.path('/user/' + userId + '/website/' + websiteId + '/page');
        }
    }
})();
