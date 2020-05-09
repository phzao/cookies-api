'use strict';

const jwt = require('jsonwebtoken');
const DAYS_IN_FUTURE = '30d';

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, {expiresIn: DAYS_IN_FUTURE});
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = function  (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['authorization'];

    if (!token) {
        res.status(401).json({
            message: 'Permissao negada'
        })
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded){
            if (error) {
                res.status(401).json({message: 'Token invalido!'})
            } else {
                next();
            }
        });
    }
}