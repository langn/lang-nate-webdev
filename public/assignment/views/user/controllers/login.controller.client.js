(function() {
    angular.module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var model = this;
        model.login = login;

        function init() {

        }
        init();

        function login(user) {
           user = UserService.findUserByCredentials(user.username, user.password) ;
           if (user) {
               $location.url("/user/" + user._id);
           } else {
               model.alert = "The credentials provided did not match any users"
           }
        }
    }

})();
