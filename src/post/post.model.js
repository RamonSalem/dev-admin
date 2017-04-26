const mongoose = require('mongoose');

//Only posts with type "global" should be in collection Post

const schema = new mongoose.Schema({
    title : String,
    tags : [{type : String}],
    description : String,
    registrationDate : Date,
    postedBy : String,
    postDate : Date,

    type: {
        type: String,
        enum: ['global', 'system'],
        default: 'global'
    }
});

module.exports = mongoose.Model('Post', schema);