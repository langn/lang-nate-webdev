(function() {
    angular.module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {
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
            widget.pageId = pageId;
            widget._id = generateRandomId();
            widgets.push(widget);
            return widget;
        }

        //Prevent id conflicts (this isn't too important bc will be implemented
        //server-side next week
        function generateRandomId() {
            var id = _.random(500, 50000000);
            return "" + id;
        }

        function findWidgetsByPageId(pageId) {
            return _.filter(widgets, {"pageId": pageId});
        }

        function findWidgetById(widgetId) {
            return _.find(widgets, {"_id": widgetId});
        }

        function updateWidget(widgetId, widget) {
            widgets = _.reject(widgets, {"_id": widgetId});
            widgets.push(widget);
        }

        function deleteWidget(widgetId) {
            widgets = _.reject(widgets, {"_id": widgetId});
        }
    }
})();