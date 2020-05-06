'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const systemConst = require('../helpers/systtem-consts');

const schema = new Schema({
    name: {
        type: String,
        required: [true, "Name é obrigatorio"]
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
    },
    roles: {
        type: Object,
        required: [true, "Permissao é obrigatorio"]
    },
    status: {
        type: String,
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
    }
});

module.exports = mongoose.model('User', schema);