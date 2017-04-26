const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : String,
    bankInfo : String,
    registrationDate : Date,
    contractAgreement : String,
    salary : String,
    jobRole : String,
    active : Boolean,
    skills : [{type : String}],
    email : String,
    password : String,
    githubLink : String
});

module.exports = mongoose.Model('Employee', schema);