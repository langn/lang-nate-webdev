(function() {
    angular.module("WebAppMaker")
        .controller("FooterController", FooterController);

    function FooterController($routeParams, $location) {
        var footerModel = this;

        footerModel.goToProfile = goToProfile;

        function init() {

        }
        init();

        function goToProfile() {
            var url = "/user/" + $routeParams["uid"];
            $location.path(url);
        }
    }
})();