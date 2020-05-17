'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        id: {
            type: String,
            required: [true, "Id do user é obrigatorio"]
        },
        status: {
            type: String,
            required: [true, "Status do usuário é obrigatorio"]
        },
        email: {
            type: String,
            required: [true, "Email é obrigatorio"]
        }
    },
    token: {
        type: String,
        required: [true, "Token é obrigatorio"]
    },
    expire_at: {
        type: Date,
        required: [true, "Quando vai expirar é obrigatorio"]
    },
    expired_at: {
        type: Date,
        default: null
    }
},
        {
    versionKey: false
});

module.exports = mongoose.model('ApiToken', schema);