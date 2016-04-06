'use strict';

var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/partials/home.html', controller: 'homeCtrl' })
    .state('form', { url: '/form', templateUrl: '/partials/form.html', controller: 'formCtrl' })
    .state('profile', { url: '/profile', templateUrl: '/partials/profile.html', controller: 'profileCtrl' })
    .state('login', {url: '/login', templateUrl: '/partials/auth.html', controller: 'authCtrl'})
    .state('register', {url: '/register', templateUrl: '/partials/auth.html', controller: 'authCtrl'})
    .state('beerz', {url: '/beerz', templateUrl: '/partials/beerz.html', controller: 'beerzCtrl'})

  $urlRouterProvider.otherwise('/');
});


function stateProtection(UserService, $state) {
  if(!UserService.username) {
    $state.go('home');
  }
}

// app.run(function(AuthService){
//   AuthService.init();
// })

app.filter('titlecase', function() {
  return function(input) {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
  }
})
