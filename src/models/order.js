'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const systemConst = require('../helpers/systtem-consts');

const schema = new Schema({
    to: {
        type: String,
        required: [true, "Nome de quem vai receber é obrigatorio"]
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        default: null
    },
    // email: {
    //     type: String,
    //     default: null
    // },
    phone: {
        type: String,
        default: null
    },
    address: {
        street: {
            type: String,
            required: [true, "Rua/Avenida é obrigatorio"]
        },
        number: {
            type: String
        },
        province: {
            type: String,
            required: [true, "Bairro/Setor é obrigatorio"]
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
    // message_card: {
    //     type: String,
    //     default: null
    // },
    discount: {
        type: Number,
        default: null
    },
    total_general: {
        type: Number,
        required: [true, "Preço Total é obrigatorio"]
    },
    items: [{
        product_id: {
            type: String,
            required: [true, "Produto é obrigatorio"]
        },
        name: {
            type: String,
            required: [true, "Produto name é obrigatorio"]
        },
        quantity: {
            type: Number,
            required: [true, "Quantidade é obrigatorio"]
        },
        unit_price: {
            type: Number,
            required: [true, "Preço é obrigatorio"]
        },
        unit_total: {
            type: Number,
            required: [true, "Total individual é obrigatorio"]
        }
    }],
    status: {
        type: String,
        enum: [systemConst.ORDER_OPEN, systemConst.ORDER_DONE, systemConst.ORDER_CANCELED, systemConst.ORDER_PROCESSING],
        required: [true, "Status é obrigatório"],
        default: systemConst.ORDER_OPEN
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

module.exports = mongoose.model('Order', schema);