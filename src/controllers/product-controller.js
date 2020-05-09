'use stricts';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-respository');
const md5 = require('md5');
const response = require('../services/response-service');

exports.get = async (req, res, next) => {
    const data = await repository.getAllBy();

    response.responseSuccess(res, data);
};

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body,'name', 2, 'Nome é obrigatório e deve possuir no mínimo 2 caracteres');
    contract.hasMinLen(req.body, 'weight',2, 'Peso é obrigatório');

    if (!contract.isValid()) {
        response.responseUnprocessableEntity(res, contract.errors());
    }
    try {

        const data = await repository.save({
            name: req.body.name,
            description: req.body.description,
            weight: req.body.weight
        });

        response.responseCreated(res, data);
    } catch (e) {
        response.responseBadRequest(res, "Erro ao salvar produto")
    }
}