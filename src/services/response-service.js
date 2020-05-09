'use-stricts';
const systemConst = require('../helpers/systtem-consts');

exports.responseCreated = (res, jsonData, headers) => {
    res.status(systemConst.HTTP_SAVED).send({
        status: 'success',
        data: jsonData
    });
};

exports.responseSuccess = (res, jsonData, headers) => {
    res.status(systemConst.HTTP_OK).send({
        status: 'success',
        data: jsonData
    });
};

exports.responseUnprocessableEntity = (res, jsonData, headers) => {
    res.status(systemConst.HTTP_UNPROCESSABLE_ENTITY).send({
        status: 'fail',
        data: jsonData
    });
};

exports.responseBadRequest = (res, message, headers) => {
    res.status(systemConst.HTTP_BAD_REQUEST).send({
        status: 'error',
        message: message
    });
};

exports.responseUnauthorized = (res, message, headers) => {
    res.status(systemConst.HTTP_UNAUTHORIZED).send({
        status: 'error',
        message: message
    });
};