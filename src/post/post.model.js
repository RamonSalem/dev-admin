const mongoose = require('mongoose');

//Only posts with type "global" should be in collection Post

const schema = new mongoose.Schema({
    title : {type : String, required : true},
    tags : [{type : String}],
    description : {type : String, required : true},
    postedBy : {type : String, required : true},
    postDate : Date,

    type: {
        type: String,
        enum: ['global', 'system'],
        default: 'global'
    }
});

module.exports = mongoose.model('Post', schema);