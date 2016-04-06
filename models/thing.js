'use strict';

var mongoose = require('mongoose');

var thingSchema = mongoose.Schema({
  adoptionDate: Date,
  name: String,
  image: String,
  test: [{type: mongoose.Schema.Types.ObjectId, ref: 'Test'}],
  createdAt: { type: Date, default: Date.now },
  adopted: { type: Boolean, default: false }
});

var Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;
