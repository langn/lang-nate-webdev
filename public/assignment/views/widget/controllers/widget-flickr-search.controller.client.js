(function() {
    angular.module('WebAppMaker')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService, $routeParams, $location) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.goToEditImage = goToEditImage;

        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        var widgetId = $routeParams['wgid'];
        function init() {
            model.photos = [];
        }
        init();

        function searchPhotos(searchTerm) {
            FlickrService.searchPhotos(searchTerm)
                .then(function(response) {
                    var data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data;
                    console.log(model.photos);
                })
        }

        function goToEditImage() {
            $location.path('user/' + userId + '/website/' + websiteId
                + '/page/' + pageId + '/widget/' + widgetId);
        }
    }
})();