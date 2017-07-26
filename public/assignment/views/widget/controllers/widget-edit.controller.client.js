(function() {
    angular.module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController() {
        var model = this;

        this.getWidgetEditUrl = getWidgetEditUrl;

        function init() {

        }
        init();

        function getWidgetEditUrl(type) {
            return "../templates/widget-" + _.lowerCase(type) + "-edit.view.client.html";
        }
    }

})();
