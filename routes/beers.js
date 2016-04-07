'use strict';

var express = require('express');
var http = require('http');
var request = require('request');
var router = express.Router();

var User = require('../models/user');
var Beer = require('../models/beer');

router.get('/', function(req, res, next) {
  request('http://api.brewerydb.com/v2/categories?key=b6bf5c4d79d28c9a4c6840de99f42bef', function(error, response, body) {
      console.log(body);
      var beers = JSON.parse(body);
      console.log(beers);
      res.send(beers);
    });
});
router.get('/random', function(req, res, next) {
  request('http://api.brewerydb.com/v2/beer/random?key=b6bf5c4d79d28c9a4c6840de99f42bef', function(error, response, body) {
      console.log(body);
      var random = JSON.parse(body);
      res.send(random);
    });
});

router.post('/', function(req, res) {
  Beer.create(req.body, function(err, beer) {
    res.status(err ? 400 : 200).send(err || beer);
  });
});


router.delete('/:id', function(req, res) {
  Beer.findById(req.params.id, function(err, beer) {
    beer.remove(function(err) {
      if(err) {
        res.status(400).send(err);
        return;
      }
      res.send();
    })
  })
})

module.exports = router;
