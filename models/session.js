var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
  sourceCode: String
});

module.exports = mongoose.model('Session', sessionSchema);
