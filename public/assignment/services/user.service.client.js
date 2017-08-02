(function() {
    angular.module("WebAppMaker")
           .factory("UserService", UserService);
    
    function UserService($http) {

        var api = {
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };
        return api;

        //Creates the given user
        function createUser(user) {
            return $http.post("/api/user", user)
                .then(function (response) {
                    return response.data;
                });
        }

        //Finds the given user by user id
        function findUserById(uid) {
            return $http.get("/api/user/" + uid)
                .then(function (response) {
                    return response.data;
                })
        }

        //Finds the given user by username
        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username)
                .then(function (response) {
                    if (response.status === 200) {
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }

        //Finds the given user by their login credentials
        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password)
                .then(function (response) {
                    if (response.status === 200) {
                        return response.data;
                    } else {
                        return null;
                    }
                })
        }

        //Updates the user with the given user id
        function updateUser(uid, user) {
            return $http.put("/api/user/" + uid, user);
        }

        function deleteUser(uid) {
            return $http.delete("/api/user" + uid);
        }
    }
})();