'use strict';

var app = angular.module('myApp');

app.controller('authCtrl', function($scope, $state, AuthService) {
  $scope.state = $state.current.name;
  $scope.submit = function(user) {
  if($scope.state === 'register') {
    if(user.password !== user.password2) {
      $scope.user.password = $scope.user.password2 = '';
      alert('Passwords must match');
      return;
    } else {
      AuthService.register(user)
        .then(function(res) {
          $state.go('profile')
          console.log('res:', res);
        }, function(err) {
          console.error(err);
        });
    }
  } else {
    AuthService.login(user)
      .then(function(res) {
        $state.go('profile')
        console.log('res:', res);
      }, function(err) {
        console.error(err);
      });
    }
  }
});
