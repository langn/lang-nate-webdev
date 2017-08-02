(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $location, $sce, WidgetService) {
        var model = this;

        model.trustHtmlContent = trustHtmlContent;
        model.trustUrlResource = trustUrlResource;
        model.getWidgetIncludeUrl = getWidgetIncludeUrl;
        model.goToEditWidget = goToEditWidget;
        model.goToNewWidget = goToNewWidget;
        model.goToPages = goToPages;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];

        function init() {
            WidgetService.findWidgetsByPageId(pageId)
                .then(function(widgets) {
                    model.widgets = widgets;
                });
        }
        init();

        function trustUrlResource(url) {
            console.log(url);
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length-1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }

        function trustHtmlContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }

        function getWidgetIncludeUrl(widgetType) {
            return "views/widget/templates/widgets/widget-" + widgetType + ".view.client.html";
        }

        function goToEditWidget(widget) {
            $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widget._id);
        }

        function goToNewWidget() {
            $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/new');
        }

        function goToPages() {
            $location.path('user/' + userId + '/website/' + websiteId + '/page');
        }
    }
})();
