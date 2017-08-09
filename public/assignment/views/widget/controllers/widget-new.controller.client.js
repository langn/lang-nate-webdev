(function() {
    angular.module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var model = this;

        model.createHeader = createHeader;
        model.createImage = createImage;
        model.createYoutube = createYoutube;
        model.goToWidgetList = goToWidgetList;
        model.createHtml = createHtml;
        model.createInput = createInput;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];

        function init() {
        }
        init();

        function createHeader() {
            var widgetStub = {type: "HEADING"};
            WidgetService.createWidget(pageId, widgetStub)
                .then(function(widget) {
                    $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widget._id);
                });
        }

        function createImage() {
            var widgetStub = {type: "IMAGE"};
            WidgetService.createWidget(pageId, widgetStub)
                .then(function(widget) {
                    $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widget._id);
                });
        }

        function createYoutube() {
            var widgetStub = {type: "YOUTUBE"};
            WidgetService.createWidget(pageId, widgetStub)
                .then(function(widget) {
                    $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widget._id);
                });
        }


        function createHtml() {
            var widgetStub = {type: "HTML"};
            WidgetService.createWidget(pageId, widgetStub)
                .then(function(widget) {
                    $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widget._id);
                });
        }

        function createInput() {
            var widgetStub = {type: "INPUT"};
            WidgetService.createWidget(pageId, widgetStub)
                .then(function(widget) {
                    $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widget._id);
                });
        }
        function goToWidgetList() {
            $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget');
        }
    }

})();
