'use strict';

var app = angular.module('myApp');

app.service('AuthService', function($http, $state, UserService) {

  this.register = function(user) {
    return $http.post('/users/register', user)
    .then(function(res) {
      //response will contain the user object
      //give the user object to the UserService
      console.log('service res:', res);
      // var user = res.data;
      UserService.set(res.data);
      console.log('service user:', user);
      // return user;
    })
  };

  this.login = function(user) {
    //we're logging in
    return $http.post('/users/authenticate', user)
      .then(function(res) {
        //response will contain the user object
        //give the user object to the UserService
        console.log('service res:', res);
        // var user = res.data;
        UserService.set(res.data);
        console.log('service user:', user);
        // return user;
      })
    };

  this.logout = function() {
    $http.delete('/users/logout')
    .then(function() {
      console.log('logged out');
      UserService.destroy();
      $state.go('home');
    });
  };

  this.init = function() {
    $http.get('/users/profile')
      .then(function(res) {
        UserService.set(res.data);
    })
  };
});

app.service('UserService', function($http) {
  this.set = function(user) {
    this.username = user.username;
    this._id = user._id;
  };
  this.destroy = function() {
    this.username = null;
    this._id = null;
  }
});
