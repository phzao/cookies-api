'use strict';

const ValidateOrder = require('../models/validator/order-validate');
const repository = require('../repositories/order-respository');
const response = require('../services/response-service');
const systemConst = require('../helpers/systtem-consts');

exports.get = async (req, res, next) => {
    const data = await repository.getAllBy();

    response.responseSuccess(res, data);
};

exports.processingOrder = async (req, res, next) => {
    const id = req.params.id;

    let order = await repository.getById(id);
    if (!order) {
        response.responseBadRequest(res, 'Pedido não encontrado');
    }

    let updateOrder = await repository.updateStatus({status: systemConst.ORDER_PROCESSING}, order._id);

    if (updateOrder) {
        response.responseUpdatedResources(res);
    }
};

exports.post = async (req, res, next) => {
    let validateOrder = new ValidateOrder()

    try {
        const { isValid, errors } = validateOrder.isValid(req.body); 
        if (!isValid)
        {
            response.responseUnprocessableEntity(res, errors);
            return;
        }  

            validateOrder.set(req.body);
            validateOrder.sumItems();
            const order = validateOrder.get();
            const data = await repository.save(order);

            response.responseCreated(res, data);
        } catch (e) {
            console.log("eee", e);
            response.responseBadRequest(res, "Erro ao salvar pedido")
        }
}
