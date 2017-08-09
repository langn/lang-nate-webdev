(function() {
    angular.module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {
        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        function createWidget(pageId, widget) {
            return $http.post("/api/page/" + pageId + "/widget", widget)
                .then(function(response) {
                   return response.data;
                });
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/" + pageId + "/widget")
                .then(function(response) {
                   if (response.status === 200) {
                       return response.data;
                   } else {
                       return [];
                   }
                });
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/" + widgetId)
                .then(function(response) {
                    if (response.status === 200) {
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/" + widgetId, widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete("api/widget" + widgetId)
        }
    }
})();