(function() {
    angular.module('WebAppMaker')
        .service('FlickrService', FlickrService);

    function FlickrService($http) {
        this.searchPhotos = searchPhotos;

        var apiKey = "6828e8f79e209536380e8afe6a74e001";
        var urlBase = "https://api.flickr.com/services/rest/" +
            "?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", apiKey)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();