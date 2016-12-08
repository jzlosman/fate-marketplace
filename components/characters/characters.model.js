var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var un = require('underscore/underscore-min');

var CharacterSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, default: 'https://s-media-cache-ak0.pinimg.com/564x/c6/46/c9/c646c93a94e71bfa7fc09ab17d30fe21.jpg'},
    aspects: {
        high_concept: {type: String, required: true},
        trouble: {type: String, required: true},
        others: [String]
    },
    skills: [{
        skill_id: Schema.Types.ObjectId, 
        shifts: Number
    }],
    stunts: [{cost: Number, label: String, magic: Boolean}],
    power_level: {type: Schema.Types.ObjectId},
    stress: {
        physical: { type: Number, default: 2},
        mental: { type: Number, default: 2},
        social: { type: Number, default: 2},
    },
    owner: {type: Schema.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Character', CharacterSchema);