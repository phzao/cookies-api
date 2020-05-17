'use strict';

let apiToken = {};

const systemConst = require('../../helpers/systtem-consts');

function ValidateApiToken() {
    apiToken = {};
}

ValidateApiToken.prototype.setApiToken = (dataToLogin) => {
    let today = new Date();
    today.setDate(today.getDate() + 30);

    apiToken = {
        user: {
            id: dataToLogin._id,
            email: dataToLogin.email,
            status: dataToLogin.status
        },
        token: dataToLogin.token,
        expire_at: today,
        expired_at: null
    };
};

ValidateApiToken.prototype.isExpiredDate = (date) => {
    const convertToObj = new Date(date);

    if (convertToObj < new Date()) {
        return true;
    }

    return false;
};

ValidateApiToken.prototype.getApiToken = () => {
    return apiToken;
};

ValidateApiToken.prototype.isValid = (dataToLogin, res, response) => {
    if (dataToLogin.status === systemConst.STATUS_DISABLE || dataToLogin.status === systemConst.STATUS_BLOCKED) {
        response.responseUnprocessableEntity(res, {user: 'Usuário bloqueado ou desativado'});
    }
};

module.exports = ValidateApiToken;