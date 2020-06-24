'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: [true, "Nome é obrigatorio"]
    },
    status: {
        type: String,
        required: [true, "Status é obrigatorio"]
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    }
},
    {
        versionKey: false
    });

module.exports = mongoose.model('Delivery', schema);     
