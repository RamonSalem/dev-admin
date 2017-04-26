const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title : String,
    tags : [{type : String}],
    description : String,
    postedBy : String, //Employee ID
    responsible : String, //Employee ID
    startedAt : Date,
    createdAt : Date,
    finishedAt : Date,
    
    reportedErrors : [{
        description : String,
        active : Boolean
    }],

    status: {
        type: String,
        enum: ['finished', 'waiting','canceled', 'inprogress'],
        default: 'waiting'
    }
});

module.exports = mongoose.Model('Task', schema);