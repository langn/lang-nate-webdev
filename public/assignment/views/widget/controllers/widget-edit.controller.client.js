(function() {
    angular.module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService, $location) {
        var model = this;

        model.getWidgetEditUrl = getWidgetEditUrl;
        model.goToWidgetList = goToWidgetList;
        model.submitWidget = submitWidget;
        model.deleteWidget = deleteWidget;
        model.searchForImages = searchForImages;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        var widgetId = $routeParams["wgid"];

        function init() {
            model.widget = {widgetType: ""};
            WidgetService.findWidgetById(widgetId)
                .then(function(widget) {
                    model.widget = widget;
                });
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            model.widgetId = widgetId;
        }
        init();

        function getWidgetEditUrl() {
            if (!(model.widget.type === "")) {
                var url = "views/widget/templates/editors/widget-" + _.lowerCase(model.widget.type) + "-edit.view.client.html";
                return url;
            }
        }

        function goToWidgetList() {
            $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget');
        }

        function submitWidget() {
            WidgetService.updateWidget(model.widget._id, model.widget)
                .then(function() {
                    goToWidgetList();
                });
        }

        function deleteWidget() {
            WidgetService.deleteWidget(model.widget._id)
                .then(function() {
                    $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget');
                });
        }

        function searchForImages() {
            $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId + '/flickrSearch');
        }
    }

})();
