var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    name: String,
    cover: String,
    intro: String,
    description: String,
    aspects: [String],
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

LocationSchema.path('intro').validate(function (v) {
  return v.length < 140;
}, 'intro must be less than 140 characters'); 

module.exports = mongoose.model('Location', LocationSchema);