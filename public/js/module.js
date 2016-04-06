'use strict';

var app = angular.module('templateApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/partials/home.html', controller: 'homeCtrl' })
    .state('form', { url: '/form', templateUrl: '/partials/form.html', controller: 'formCtrl' })

  $urlRouterProvider.otherwise('/');
});
