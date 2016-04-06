'use strict';

var app = angular.module('myApp');

app.controller('formCtrl', function($scope, $http) {
  console.log('form');

  $scope.submitForm = function() {
    console.log('click');
    $scope.users = [];
    var user = {user: $scope.user.name, email: $scope.user.email, password: $scope.user.password, image: $scope.user.image};
    console.log('user', user);
    $scope.users.push(user);
    $http({
      method: 'POST',
      url: '/users',
      data: user
      }).then(function(response){
        swal("Your profile has been created!");
      }, function(err){
        console.error(err);
      })
      $scope.user = {};
    }
});
