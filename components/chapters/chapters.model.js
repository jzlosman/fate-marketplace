var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChapterSchema = new Schema({
    name: String,
    story: { type: Schema.Types.ObjectId, ref: 'Story' },
    characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
    locations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
    intro: String,
    notes: {
        public: [String],
        gm: [String]
    }
});

module.exports = mongoose.model('Chapter', ChapterSchema);