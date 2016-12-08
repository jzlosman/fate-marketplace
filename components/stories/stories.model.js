var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
    name: String,
    description: String,
    setting: { type: Schema.Types.ObjectId, ref: 'Setting' },
    players: [
        { user: {type: Schema.Types.ObjectId, ref: 'User' },
            isGM: {type: Boolean, default: false}
        }],
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plays: { type: Number, default: 0 },
    clones: {type: Number, default: 0 },
    source: { type: Schema.Types.ObjectId, ref: 'Story' },
    private: {type: Boolean, default: false},
    notes: [{
        text: String, 
        hidden: { type: Boolean, default: false }
    }]
});

module.exports = mongoose.model('Story', StorySchema);