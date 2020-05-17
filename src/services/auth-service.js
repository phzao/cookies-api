'use strict';

const ValidateApiToken = require('../models/validator/api-token-validate');
const tokenRepository = require('../repositories/api-token-respository');
const response = require('../services/response-service');
const jwt = require('jsonwebtoken');
const DAYS_IN_FUTURE = '30d';

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, {expiresIn: DAYS_IN_FUTURE});
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['authorization'];

    if (!token) {
        res.status(401).json({
            message: 'Permissao negada'
        })
    } else {
        const apiTokenContract = new ValidateApiToken();
        let tokenData = await tokenRepository.getByToken(token);

        if (apiTokenContract.isExpiredDate(dataToken.expire_at)) {
            tokenData.expired_at = new Date();
            tokenRepository.save(tokenData);
            response.responseUnauthorized(res, 'Token expirou, faça uma nova autenticação!');
        }
        // jwt.verify(token, global.SALT_KEY, function (error, decoded){
        //     if (error) {
        //         res.status(401).json({message: 'Token invalido!'})
        //     } else {
        //         next();
        //     }
        // });
    }
}