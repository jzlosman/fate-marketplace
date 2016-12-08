var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var tinycolor = require('tinycolor2');
var defaultColor = tinycolor("#209e7c");

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String,
    },
    color: {
        type: String,
        default: defaultColor.spin(Math.floor(Math.random() * 360)).toHexString()
    },
    pic: {
        type: String
    },
    facebook_id: {
        type: String
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    
    if(!user.isModified('password')) return next()
    
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return next(err);
        
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.verifyPassword = function(password, next) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if(err) return next(err);
        next(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);