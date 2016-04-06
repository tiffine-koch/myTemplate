'use strict';

var mongoose = require('mongoose');

var beerSchema = mongoose.Schema({
  name: String,
  description: String,
  rating: Number,
  comment: [{type: String}],
  // comment: String,
  sampled: { type: Boolean, default: false }
});

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
