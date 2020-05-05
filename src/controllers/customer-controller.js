'use stricts';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-respository');
const md5 = require('md5');
const emailService = require('../services/email-services');
const authService = require('../services/auth-service');

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter no mínimo 3 caracters');
    contract.hasMinLen(req.body.email, 'O E-mail deve conter no mínimo 3 caracters e ser um email válido');
    contract.hasMinLen(req.body.password, 6, 'O password deve conter no mínimo 6 caracters');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        const data = await repository.save({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password+global.SALT_KEY)
        });

        emailService.send(req.body.email, 'Hi', 'Bem vindo');
        res.status(201).send({message:"Customer cadastrado com sucesso"});
    } catch (e) {
        res.status(400).send({message:"Erro ao salvar customer", data: e});
    }
}

exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password+global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({message: "Usuario ou senha invalidos"});
            return ;
        }

        const token = await authService.generateToken({
            email: customer.email,
            name: {
                name: customer.name,
                email: customer.email
            }
        })

        res.status(201).send({data:customer, token:token});
    } catch (e) {
        res.status(400).send({message:"Erro ao salvar customer", data: e});
    }
}

exports.refreshToken = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password+global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({message: "Usuario ou senha invalidos"});
            return ;
        }

        const token = await authService.generateToken({
            email: customer.email,
            name: {
                name: customer.name,
                email: customer.email
            }
        })

        res.status(201).send({data:customer, token:token});
    } catch (e) {
        res.status(400).send({message:"Erro ao salvar customer", data: e});
    }
}