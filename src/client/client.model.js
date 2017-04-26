const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : String,
    contact : String,
    registrationDate : Date,
    contractAgreement : String
});

module.exports = mongoose.Model('Client', schema);