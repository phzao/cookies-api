'use strict';

const ValidateDelivery = require('../models/validator/delivery-validate');
const repository = require('../repositories/delivery-repository');
const response = require('../services/response-service');

exports.getAllWithoutFilter = async (req, res, next) => {
    const data = await repository.getAllBy();

    response.responseSuccess(res, data);
};

exports.post = async (req, res, next) => {
    let validateDelivery = new ValidateDelivery()

    try {
        const { isValid, errors } = validateDelivery.isValid(req.body);

        if (!isValid) {
            response.responseUnprocessableEntity(res, errors);
            return;
        } 

        validateDelivery.set(req.body);

        const delivery = validateDelivery.getDeliveryBy();
        const data = await repository.save(delivery);

        response.responseCreated(res, data);
    } catch (e) {
        response.responseBadRequest(res, "Erro ao salvar quem entrega")
    }
} 
