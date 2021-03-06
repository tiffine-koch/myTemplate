'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');

const JWT_SECRET = 'this is my SUPER secret';

var User;

var userSchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  image: {type: String, required: true},
  beers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Beer'}]
});

userSchema.statics.register = function(userObj, cb) {
    bcrypt.hash(userObj.password, 10, function(err, hash) {
      if(err) {
        return cb(err);
      }
      User.create({
        username: userObj.username,
        password: hash
      }, function(err) {
        cb(err);
    })
  })
}

userSchema.statics.authenticate = function(userObj, cb) {
  User.findOne({username: userObj.username}, function(err, dbuser) {
    if(err || !dbuser) {
      return cb("Authentication failed 1");
    }
    bcrypt.compare(userObj.password, dbuser.password, function(err, isGood) {
      if(!isGood) {
        return cb("Authentication failed 2");
      }
      var payload = {
        userId: dbuser._id,
        iat: Date.now()
      }
      var token = jwt.encode(payload, JWT_SECRET);
      cb(null, token);
    });
  });
}

userSchema.statics.authMiddleWare = function(req, res, next) {
    var token = req.cookies.tiffcookie;
    // console.log("token", token);
    // if(!token) {
    //   return res.status(401).send('No token. Get one!');
    // }
    try {
      var payload = jwt.decode(token, JWT_SECRET);
    } catch (err) {
      console.log('err:', err);
      return res.clearCookie('tiffcookie').status(401).send();
    }
    User.findById(payload.userId, function(err, user) {
      if(err || !user) {
        return res.clearCookie('tiffcookie').status(401).send(err);
      }
    req.user = user;
    next();
    })
  }


User = mongoose.model('User', userSchema);

module.exports = User;
