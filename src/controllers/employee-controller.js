'use stricts';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/user-respository');
const md5 = require('md5');
const response = require('../services/response-service');

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body,'name', 3, 'O nome deve conter no mínimo 3 caracters');
    contract.hasMinLen(req.body, 'email',8, 'O E-mail deve conter no mínimo 8 caracters e ser um email válido');
    contract.hasMinLen(req.body, 'password', 6, 'O password deve conter no mínimo 6 caracters');
    contract.isJson(req.body, 'roles', 'Permissão deve ser setada');
    contract.hasMinLen(req.body,'city', 3, 'Cidade deve conter no mínimo 3 caracters');
    contract.hasExacLen(req.body,'state', 2, 'O estado deve conter 2 caracters');

    if (!contract.isValid()) {
        response.responseUnprocessableEntity(res, contract.errors());
        return;
    }
    try {

        const data = await repository.save({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password+global.SALT_KEY),
            employee: {
                roles: req.body.roles,
                city: req.body.city,
                state: req.body.state
            }
        });

        // emailService.send(req.body.email, 'Hi', 'Bem vindo');
        // res.status(201).send({message:"User cadastrado com sucesso"});
        response.responseCreated(res, data);
    } catch (e) {
        response.responseBadRequest(res, "Erro ao salvar employee")
        // res.status(systemConst.HTTP_BAD_REQUEST).send({message:"Erro ao salvar user", data: e});
    }
}