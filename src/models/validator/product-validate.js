'use strict';

let product = {};

const ValidationContract = require('../../validators/fluent-validator');
const systemConst = require('../../helpers/systtem-consts');

function ValidateProduct() {
    product = {};
}

ValidateProduct.prototype.set = (body) => {
    product = {
        name: body.name || null,
        description: body.description || null,
        weight: body.weight || null,
        status: body.status || systemConst.STATUS_ENABLE
    };
};

ValidateProduct.prototype.getProduct = () => {
    return product;
};

ValidateProduct.prototype.isValid = (body, res, response) => {
    let contract = new ValidationContract();

    contract.hasMinLen(body, 'name', 2, 'Nome é obrigatório e deve possuir no mínimo 2 caracteres');
    contract.hasMaxLen(body, 'name', 30, 'Nome é obrigatório e deve possuir no máximo 30 caracteres');
    contract.hasMinLen(body, 'weight', 2, 'Peso é obrigatório');
    contract.hasMaxLen(body, 'weight', 10, 'Peso é obrigatório e deve possuir no máximo 10 caracteres');
    contract.hasMaxLen(body, 'description', 300, 'Descrição deve possuir no máximo 300 caracteres');

    if (!contract.isValid()) {
        response.responseUnprocessableEntity(res, contract.errors());
    }
};

module.exports = ValidateProduct;