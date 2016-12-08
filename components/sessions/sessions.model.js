var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
    chapter: { type: Schema.Types.ObjectId, ref: 'Chapter' },
    summary: {type: String},
    notes: {
        shared: [String],
        hidden: [String]
    },
    characters: [{
        player: { type: Schema.Types.ObjectId, ref: 'User' },
        character: { type: Schema.Types.ObjectId, ref: 'Character' }
    }],
    owner: { type: Schema.Types.ObjectId, ref:'User' },
    history: []
})

module.exports = mongoose.model('Session', SessionSchema);