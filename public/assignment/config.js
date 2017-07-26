(function() {
    angular.module("WebAppMaker")
           .config(configuration);
    
    function configuration($routeProvider) {
        $routeProvider.when("default", {
            templateUrl: "views/user/templates/login.view.client.html",
            controller: "LoginController",
            controllerAs: "model"
        }).when("/", {
            templateUrl: "views/user/templates/login.view.client.html",
            controller: "LoginController",
            controllerAs: "model"
        }).when("/login", {
            templateUrl: "views/user/templates/login.view.client.html",
            controller: "LoginController",
            controllerAs: "model"
        }).when("/home", {
            templateUrl: "views/user/templates/home.view.client.html"
        }).when("/register", {
            templateUrl: "views/user/templates/register.view.client.html",
            controller: "RegisterController",
            controllerAs: "model"
        }).when("/user/:uid", {
            templateUrl: "views/user/templates/profile.view.client.html",
            controller: "ProfileController",
            controllerAs: "model"
        }).when("/user/:uid/website", {
            templateUrl: "views/website/templates/website-list.view.client.html",
            controller: "WebsiteListController",
            controllerAs: "model"
        }).when("/user/:uid/website/new", {
            templateUrl: "views/website/templates/website-new.view.client.html",
            controller: "NewWebsiteController",
            controllerAs: "model"
        }).when("/user/:uid/website/:wid", {
            templateUrl: "views/website/templates/website-edit.view.client.html",
            controller: "EditWebsiteController",
            controllerAs: "model"
        }).when("/user/:uid/website/:wid/page", {
            templateUrl: "views/page/templates/page-list.view.client.html",
            controller: "PageListCtrl",
            controllerAs: "model"
        }).when("/user/:uid/website/:wid/page/new", {
            templateUrl: "views/page/templates/page-new.view.client.html",
            controller: "PageNewCtrl",
            controllerAs: "model"
        }).when("/user/:uid/website/:wid/page/:pid", {
            templateUrl: "views/page/templates/page-edit.view.client.html",
            controller: "EditPageCtrl",
            controllerAs: "model"
        }).when("/user/:uid/website/:wid/page/:pid/widget", {
            templateUrl: "views/widget/widget-list.view.client.html",
            controller: "WidgetListController",
            controllerAs: "model"
        }).when("/user/:uid/website/:wid/page/:pid/widget/new", {
            templateUrl: "views/page/widget-chooser.view.client.html",
            controller: "NewWidgetController",
            controllerAs: "model"
        }).when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
            templateUrl: "views/widget/widget-edit.view.html",
            controller: "EditWidgetController",
            controllerAs: "model"
        })
    }
})();