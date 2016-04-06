'use strict';

var mongoose = require('mongoose');

var testSchema = mongoose.Schema({
  name: String,
  image: String,
  bio: String,
  number: Number,
  things: [{type: mongoose.Schema.Types.ObjectId, ref: 'Thing'}],
  createdAt: { type: Date, default: Date.now }
});

var Test = mongoose.model('Test', testSchema);

module.exports = Test;
