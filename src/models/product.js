'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const systemConst = require('../helpers/systtem-consts');

const schema = new Schema({
    name: {
        type: String,
        required: [true, "Nome é obrigatorio"]
    },
    description: {
        type: String,
        default: null
    },
    weight: {
        type: String,
        required: [true, "Peso é obrigatorio"]
    },
    status: {
        type: String,
        enum: [systemConst.STATUS_ENABLE, systemConst.STATUS_DISABLE],
        required: [true, "Status é obrigatório"],
        default: systemConst.STATUS_ENABLE
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    },
    deleted_at: {
        type: Date,
        default: null
    }
},
        {
            versionKey: false
});

module.exports = mongoose.model('Product', schema);