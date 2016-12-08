var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SettingSchema = new Schema({
    name: String,
    description: String,
    locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
    cover: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Setting', SettingSchema);