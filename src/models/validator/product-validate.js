'use strict';

let product = {};

const ValidationContract = require('../../validators/fluent-validator');
const systemConst = require('../../helpers/systtem-consts');

function ValidateProduct() {
    product = {};
}

ValidateProduct.prototype.getProductUpdated = (request, product) => {
    return {
        _id: product._id,
        name: request.name || product.name,
        description: request.description || product.description,
        weight: request.weight || product.weight,
        price: request.price || product.price,
        status: request.status || product.status
    };
}

ValidateProduct.prototype.set = (body) => {
    product = {
        name: body.name || null,
        description: body.description || null,
        weight: body.weight || null,
        price: body.price || null,
        status: body.status || systemConst.STATUS_ENABLE
    };
};

ValidateProduct.prototype.getProduct = () => {
    return product;
};

ValidateProduct.prototype.isValid = (body) => {
    let contract = new ValidationContract();

    contract.hasMinLen(body, 'name', 2, 'Nome é obrigatório e deve possuir no mínimo 2 caracteres');
    contract.hasMaxLen(body, 'name', 30, 'Nome é obrigatório e deve possuir no máximo 30 caracteres');
    contract.hasMinLen(body, 'weight', 2, 'Peso é obrigatório');
    contract.isNumber(body, 'price', 'Preço é obrigatório');
    contract.hasMaxLen(body, 'weight', 10, 'Peso é obrigatório e deve possuir no máximo 10 caracteres');
    contract.hasMaxLenOrNull(body, 'description', 300, 'Descrição deve possuir no máximo 300 caracteres');

    return {
        isValid: contract.isValid(),
        errors: contract.errors()        
    }; 
};

module.exports = ValidateProduct;
