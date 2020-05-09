'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
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
});

module.exports = mongoose.model('Customer', schema);