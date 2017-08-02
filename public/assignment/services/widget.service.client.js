(function() {
    angular.module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {
        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        function createWidget(pageId, widget) {
            return $http.post("/api/page/" + pageId + "/widget", widget)
                .then(function(response) {
                   return response.data;
                });
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/" + pageId + "widget")
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