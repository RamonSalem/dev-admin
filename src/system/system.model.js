const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    routes : {
                finances : String,
                history : String,
                users : String,
                orders : String     
             },

    name : String,         
    clientId : String,
    description : String,
    active : Boolean,
    registrationDate : Date,

    //Only posts with type "system" should be here
    post : [{
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
            }]
});

module.exports = mongoose.Model('System', schema);