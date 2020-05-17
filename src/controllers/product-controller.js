'use strict';

const ValidateProduct = require('../models/validator/product-validate');
const repository = require('../repositories/product-respository');
const response = require('../services/response-service');

exports.get = async (req, res, next) => {
    const data = await repository.getAllBy();

    response.responseSuccess(res, data);
};

exports.post = async (req, res, next) => {
    let validateProduct = new ValidateProduct()

    validateProduct.isValid(req.body, res, response);

    try {
        validateProduct.set(req.body);

        const product = validateProduct.getProduct();
        const data = await repository.save(product);

        response.responseCreated(res, data);
    } catch (e) {
        response.responseBadRequest(res, "Erro ao salvar produto")
    }
}