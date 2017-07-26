(function() {
    angular.module("WebAppMaker")
           .factory("UserService", UserService);
    
    function UserService() {
        var users = [
            { _id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
            { _id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
            { _id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
            { _id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }
        ];
        
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
            user._id = generateRandomId();
            delete user.verifyPassword;
            users.push(user);
            return user;
        }

        //Prevent id conflicts (this isn't too important bc will be implemented
        //server-side next week
        function generateRandomId() {
             var id = _.random(500, 50000000);
             return "" + id;
        }

        //Finds the given user by user id
        function findUserById(uid) {
            return _.find(users, {'_id' : uid});
        }

        //Finds the given user by username
        function findUserByUsername(username) {
            return _.find(users, {'username' : username});
        }

        //Finds the given user by their login credentials
        function findUserByCredentials(username, password) {
            return _.find(users, {'username' : username, 'password' : password});
        }

        //Updates the user with the given user id
        function updateUser(uid, user) {
            //Get users array with all of the other users and stick the updated user on it
            users = _.reject(users, {'_id' : uid});
            users.push(user);
        }

        function deleteUser(uid) {
            users = _.reject(users, {'_id' : uid});
        }
    }
})();