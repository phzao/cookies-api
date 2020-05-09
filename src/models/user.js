'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const systemConst = require('../helpers/systtem-consts');

const schema = new Schema({
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
    employee: {
        roles: {
            type: Object,
            required: [true, "Permissoes é obrigatorio"]
        },
        city: {
            type: String,
            required: [true, "Cidade é obrigatorio"]
        },
        state: {
            type: String,
            required: [true, "Estado é obrigatorio"]
        }
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        default: null
    },
    status: {
        type: String,
        enum: [systemConst.STATUS_ENABLE, systemConst.STATUS_DISABLE, systemConst.STATUS_BLOCKED],
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

module.exports = mongoose.model('User', schema);