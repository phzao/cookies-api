'use strict';

const mongoose = require('mongoose');
const ApiToken = mongoose.model('ApiToken');

exports.save = async (data) => {
    const apiToken = new ApiToken(data);
    return apiToken.save()
                    .then(res=>{return res;})
                    .catch(err=>{console.log('apiToken error save', err)});
}

exports.getTokenNotExpiredByEmail = async (email) => {
    const res = await ApiToken.findOne({"user.email":email, "expired_at": null});

    return res;
}

exports.getByToken = async (token) => {
    const res = await ApiToken.findOne({token: token, "expired_at": null});

    return res;
}