(function() {
    angular.module('wbdvDirectives', [])
        .directive('sortable', sortableDirective);

    function sortableDirective($http, $routeParams) {
        function linkFunction(scope, element) {
            var pageId = $routeParams["pid"];
            var startIndex = -1;
            var stopIndex = -1;
            element.find("ul").sortable({
                handle: ".fa-arrows",
                start: function(event, ui) {
                    startIndex = $(ui.item).index();
                },
                stop: function(event, ui) {
                    stopIndex = $(ui.item).index();
                    var url = "/api/page/" + pageId + "/widget?initial=" + startIndex + "&final=" + stopIndex;
                    $http.put(url);
                }
            });
        }
        return {
            templateUrl: "views/widget/templates/widget-list-raw.view.client.html",
            link: linkFunction
        }
    }
})();