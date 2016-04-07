var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Beer = require('../models/beer');

router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.status(err ? 400 : 200).send(err || users);
  });
});

router.post('/', function(req, res, next) {
  var user = new User(req.body);
  console.log(user);
  user.save(function(err, savedUser) {
    console.log('savedUser:', savedUser);
    res.send(savedUser);
  });
});

router.post('/', function(req, res, next) {
  var user = new User(req.body);
  console.log(user);
  user.save(function(err, savedUser) {
    console.log('savedUser:', savedUser);
    res.send(savedUser);
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

router.delete('/logout', function(req, res) {
  res.clearCookie('tiffcookie').send();
});

router.get('/profile', User.authMiddleWare, function(req, res) {
  res.send(req.user);
});

router.post('/authenticate', function(req, res) {
  User.authenticate(req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('tiffcookie', token).send(user);
    }
  });
});

router.post('/register', function(req, res) {
  User.register(req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('tiffcookie', token).send(user);
    }
  });
});

module.exports = router;
