var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    app: { type: String, unique: true, required: true},
    secret: { type: String, required: true },
    user_id: { type: String, required: true }
});

module.exports = mongoose.model('Client', ClientSchema);