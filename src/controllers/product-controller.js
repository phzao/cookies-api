'use strict';

const ValidateProduct = require('../models/validator/product-validate');
const repository = require('../repositories/product-respository');
const response = require('../services/response-service');

exports.getAllWithoutFilter = async (req, res, next) => {
    const data = await repository.getAllBy();

    response.responseSuccess(res, data);
};

exports.post = async (req, res, next) => {
    let validateProduct = new ValidateProduct()

    validateProduct.isValid(req.body, res, response);

     try {
        validateProduct.set(req.body);

        const product = validateProduct.getProduct();
        validateProduct.isValid(product, res, response);

        const data = await repository.save(product);

        response.responseCreated(res, data);
    } catch (e) {
        response.responseBadRequest(res, "Erro ao salvar produto")
    }
} 

exports.update = async (req, res, next) => {
    let validateProduct = new ValidateProduct();
    const id = req.params.id;
    let product = await repository.getById(id);

    if (!product) {
      response.responseBadRequest({id: "Não existe produto com o id informado"}, res, response);
    }

    try {
      const productFilled = validateProduct.getProductUpdated(req.body, product);
      console.log('filled', productFilled);
      validateProduct.isValid(productFilled, res, response);
    console.log('vai atualizar', productFilled);
      const updated = await repository.save(productFilled);
      response.responseUpdatedResources(res);
    } catch (e) {
      console.log(e);
      response.responseBadRequest(res, "Erro ao atualizar produto ", e);
    }
}
