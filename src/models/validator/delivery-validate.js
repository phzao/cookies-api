'use strict';

let delivery = {};

const ValidationContract = require('../../validators/fluent-validator');
const systemConst = require('../../helpers/systtem-consts');

function ValidateDelivery() {
    delivery = {};        
}

ValidateDelivery.prototype.set = (body) => {
    delivery = {
        name: body.name || null,
        status: body.status || systemConst.STATUS_ENABLE
    };
};

ValidateDelivery.prototype.getDeliveryBy = () => {
    return delivery;
};

ValidateDelivery.prototype.isValid = (body) => {
  let contract = new ValidationContract();

    contract.hasMinLen(body, 'name', 2, 'Nome é obrigatório e deve possuir no mínimo 2 caracteres');
    
    return {
        isValid: contract.isValid(),
        errors: contract.errors()
    }; 
};

module.exports = ValidateDelivery;
