'use strict';

const ValidateApiToken = require('../models/validator/api-token-validate');
const tokenRepository = require('../repositories/api-token-respository');
const response = require('../services/response-service');
const crypto = require('crypto');

exports.generateToken = async (data) => {
    return crypto.createHash('sha512').update(JSON.stringify(data)+global.SALT_KEY).digest('hex');
}

exports.decodeToken = async (token) => {
    // var data = await jwt.verify(token, global.SALT_KEY);
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

        if (!tokenData) {
          response.responseForbidden(res, 'Token invalido');
        }

        if (apiTokenContract.isExpiredDate(tokenData.expire_at)) {
          tokenData.expired_at = new Date();
          tokenRepository.save(tokenData);
          response.responseUnauthorized(res, 'Token expirou, faça uma nova autenticação!');
        }

        next();
        // jwt.verify(token, global.SALT_KEY, function (error, decoded){
        //     if (error) {
        //         res.status(401).json({message: 'Token invalido!'})
        //     } else {
        //         next();
        //     }
        // });
    }
}
