'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: [true, "Name é obrigatorio"],
    },
    email: {
        type: String,
        required: [true, "Email é obrigatorio"],
        trim: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password é obrigatorio"]
    }
});

module.exports = mongoose.model('Customer', schema);