(function() {
    angular.module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService, $location) {
        var model = this;

        model.getWidgetEditUrl = getWidgetEditUrl;
        model.goToWidgetList = goToWidgetList;
        model.submitWidget = submitWidget;
        model.deleteWidget = deleteWidget;

        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        var widgetId = $routeParams["wgid"];

        function init() {
        }
        init();

        function getWidgetEditUrl() {
            model.widget = WidgetService.findWidgetById(widgetId);
            return "views/widget/templates/editors/widget-" + _.lowerCase(model.widget.widgetType) + "-edit.view.client.html";
        }

        function goToWidgetList() {
            $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget');
        }

        function submitWidget() {
            WidgetService.updateWidget(model.widget._id, model.widget);
            goToWidgetList();
        }

        function deleteWidget() {
            WidgetService.deleteWidget(model.widget._id);
            $location.path('user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget');
        }
    }

})();
