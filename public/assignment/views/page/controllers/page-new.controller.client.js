(function() {
    angular.module("WebAppMaker")
        .controller("PageNewCtrl", PageNewCtrl);

    function PageNewCtrl($routeParams, $location, PageService) {
        var model = this;

        model.createNewPage = createNewPage;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        function init() {
            model.emptyFields = false;
        }
        init();

        function createNewPage(page) {
            if (!page || !(page.name && page.title)) {
                model.emptyFields = true;
            } else {
                PageService.createPage(websiteId, page)
                    .then(function() {
                        $location.path('/user/' + userId + '/website/' + websiteId + '/page');
                    });
            }
        }
    }

})();
