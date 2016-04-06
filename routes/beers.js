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

router.get('/:id', function(req, res) {
  User.findById(req.params.id)
  .populate('beers')
  .exec(function(err, user) {
    if(err || !user) return res.status(400).send(err || "User not found");
    res.send(user);
  })
})

router.get('/:id', function(req, res) {
  User.findById(req.params.id)
  .populate('beers')
  .exec(function(err, user) {
    if(err || !user) return res.status(400).send(err || "User not found");
    res.send(user);
  })
})

router.post('/', function(req, res) {
  User.create(req.body, function(err, user) {
    res.status(err ? 400 : 200).send(err || user);
  });
});

router.put('/:userId/addBeer/:beerId', function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if(err || !user) return res.status(400).send(err || "User not found");
    Beer.findById(req.params.beerId, function(err, beer) {
      if(err || !beer) return res.status(400).send(err || "Beer not found");
      user.beers.push(req.params.beerId);

      user.save(function(err, savedUser) {
        res.status(err ? 400 : 200).send(err || savedUser);
      });
    })
  })
})

router.delete('/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    user.remove(function(err) {
      if(err) {
        res.status(400).send(err);
        return;
      }
      res.send();
    })
  })
})

module.exports = router;
