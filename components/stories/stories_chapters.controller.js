var Model = require('./stories.model');
var xhr = require('../shared/xhr');

var addChapterToStory = function(req, res) {
    Model.findOne({ owner: req.user._id, _id: req.params.id }, function(err, story) {
        if(err) { return res.send(err); }
        
        if(!story) { return xhr.notFound(res, 'Story not found'); }
        
        if(story.chapters.indexOf(req.body.chapter_id) !== -1){
           xhr.conflict(res, 'Chapter already exists in this story');
        }
        
        story.chapters.push(req.body.chapter_id);
        
        story.save(function(err) {
            if(err) { res.send(err); }
            xhr.returnEntity(res, story);
        });
    });
};

var removeChapterFromStory = function(req, res) {
   Model.findOne({ owner: req.user._id, _id: req.params.id }, function(err, instance) {
       if(err) { return res.send(err); }
       
       if(!instance) { return xhr.notFound(res, 'Story not found'); }
       
       var i = instance.chapters.indexOf(req.params.chapter_id);
       if(i === -1){
           xhr.notFound(res, 'Chapter does not exist in this story');
       }
       
       instance.chapters.splice(i,1);
       
       instance.save(function(err) {
            if(err) { res.send(err); }
            xhr.returnEntity(res, instance);
       });
    });
}

module.exports = { 
    addChapterToStory: addChapterToStory, 
    removeChapterFromStory: removeChapterFromStory
};