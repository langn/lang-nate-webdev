(function() {
    angular.module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var model = this;
        model.registerUser = registerUser;

        function init() {
            model.passwordMismatch = false;
            model.missingFields = false;
        }
        init();

        function registerUser(user) {
           if (!(user.password && user.verifyPassword && user.firstName && user.lastName)) {
               model.missingFields = true;
           } else if (user.password === user.verifyPassword) {
               UserService.createUser(user)
                   .then(function(newUser) {
                       $location.path('/user/' + newUser._id);
                   });
           } else {
               model.passwordMismatch = true;
           }
        }
    }

})();
