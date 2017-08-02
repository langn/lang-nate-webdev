(function() {
    angular.module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {
        var model = this;
        var userId = $routeParams["uid"];
        model.updateUser = updateUser;
        model.goToWebsites = goToWebsites;

        function init() {
            UserService.findUserById(userId)
                .then(function(user) {
                    model.user = user;
                });
        }
        init();

        function updateUser() {
            UserService.updateUser(userId, model.user);
        }

        function goToWebsites() {
            $location.path('/user/' + userId + '/website');
        }
    }
})();
