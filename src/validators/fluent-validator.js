'use strict';

let errors = {};

function ValidationContract() {
    errors = {};
}

ValidationContract.prototype.isRequired = (body, field, message) => {
    if (!body[field] || body[field].length <= 0) {
        errors[field] = message;
    }
}

ValidationContract.prototype.hasMinLen = (body, field, min, message) => {
    if (!body[field] || body[field].length < min) {
        errors[field] = message;
    }
}

ValidationContract.prototype.hasExacLen = (body, field, len, message) => {
    if (!body[field] || body[field].length !== len) {
        errors[field] = message;
    }
}

ValidationContract.prototype.hasMaxLenOrNull = (body, field, len, message) => {
    if (body[field] !==undefined &&  body[field].length !== len) {
        errors[field] = message;
    }
}

ValidationContract.prototype.hasMaxLen = (body, field, max, message) => {
    if (!body[field] || body[field].length > max) {
        errors[field] = message;
    }
}

ValidationContract.prototype.isFixedLen = (body, field, len, message) => {
    if (!body[field] || body[field].length != len) {
        errors[field] = message;
    }
}

ValidationContract.prototype.isJson = (body, field, message) => {
    if (typeof body[field] != 'object') {
        errors[field] = message;
    }
}

ValidationContract.prototype.errors = () => {
    return errors;
}

ValidationContract.prototype.clear = () => {
    errors = [];
}

ValidationContract.prototype.isValid = () => {
    return Object.keys(errors).length == 0;
}

ValidationContract.prototype.isArrayGreaterThan = (body, field, len, message) => {
    if (!body[field] || !Array.isArray(body[field]) ||  body[field].length < len) {
        errors[field] = message;
    }
}

ValidationContract.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value)) {
        errors[field] = message;
    }
}

module.exports = ValidationContract;
