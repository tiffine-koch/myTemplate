'use strict';

var app = angular.module('myApp');

app.controller('formCtrl', function($scope, $http, UserService, $rootScope) {
  console.log('form');

  $scope.submitForm = function() {
    console.log('click');
    var user = {user: $scope.user.name, email: $scope.user.email, password: $scope.user.password, image: $scope.user.image};
    console.log('user', user);
    $rootScope.user = user;
    console.log($rootScope.user);
    UserService.create(user)
    .then(function(response){
        swal("Your profile has been created!");
      }, function(err){
        console.error(err);
      })
      $scope.user = {};
    }
  });
