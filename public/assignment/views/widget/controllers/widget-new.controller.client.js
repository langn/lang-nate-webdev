(function() {
    angular.module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var model = this;

        model.createHeader = createHeader;
        model.createImage = createImage;
        model.createYoutube = createYoutube;
        model.goToWidgetList = goToWidgetList;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        function init() {

        }
        init();

        function createHeader() {
            var widgetStub = {widgetType: "HEADING"};
            var widget = WidgetService.createWidget(pageId, widgetStub);
            $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widget._id);
        }

        function createImage() {
            var widgetStub = {widgetType: "IMAGE"};
            var widget = WidgetService.createWidget(pageId, widgetStub);
            $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widget._id);
        }

        function createYoutube() {
            var widgetStub = {widgetType: "YOUTUBE"};
            var widget = WidgetService.createWidget(pageId, widgetStub);
            $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widget._id);
        }

        function goToWidgetList() {
            $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget');
        }
    }

})();
