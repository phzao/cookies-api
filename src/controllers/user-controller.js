'use strict';

const ValidationContract = require('../validators/fluent-validator');
const ValidateApiToken = require('../models/validator/api-token-validate');
const repository = require('../repositories/user-respository');
const tokenRepository = require('../repositories/api-token-respository');
const md5 = require('md5');
const authService = require('../services/auth-service');
const response = require('../services/response-service');

function getUserToLogin(req) {
    return {
        email: req.body.email,
        password: md5(req.body.password+global.SALT_KEY)
    };
}

exports.authenticate = async (req, res, next) => {
    let contract = new ValidationContract();
    let apiTokenContract = new ValidateApiToken();

    contract.hasMinLen(req.body, 'email',8, 'O E-mail deve conter no mínimo 8 caracters e ser um email válido');
    contract.hasMinLen(req.body, 'password', 6, 'O password deve conter no mínimo 6 caracters');

    if (!contract.isValid()) {
        response.responseUnprocessableEntity(res, contract.errors());
        return;
    }

    try {
        const userData = getUserToLogin(req);

        let user = await repository.authenticate(userData);

        if (!user) {
            response.responseUnauthorized(res, "Usuario ou senha invalidos");
            return ;
        }

        let dataToken = await tokenRepository.getTokenNotExpiredByEmail(user.email);

        if(!dataToken || apiTokenContract.isExpiredDate(dataToken.expire_at)) {
            const token = await authService.generateToken({
                email: user.email,
                name: {
                    name: user.name,
                    email: user.email
                }
            });
            const loginData = Object.assign({}, user['_doc'], {token: token});
            apiTokenContract.isValid(loginData, res, response);
            apiTokenContract.setApiToken(loginData);

            if (dataToken) {
                dataToken.expired_at = new Date();
                await tokenRepository.save(dataToken);
            }

            const dataToLogin = apiTokenContract.getApiToken();
            dataToken = await tokenRepository.save(dataToLogin);
        }

        response.responseSuccess(res, dataToken);
    } catch (e) {
        response.responseUnauthorized(res, "Erro ao tentar autenticar");
    }
}

exports.refreshToken = async(req, res, next) => {
    try {
        const user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password+global.SALT_KEY)
        });

        if (!user) {
            res.status(404).send({message: "Usuario ou senha invalidos"});
            return ;
        }

        const token = await authService.generateToken({
            email: user.email,
            name: {
                name: user.name,
                email: user.email
            }
        })

        res.status(201).send({data:user, token:token});
    } catch (e) {
        res.status(400).send({message:"Erro ao salvar user", data: e});
    }
}