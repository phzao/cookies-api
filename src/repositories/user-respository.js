'use stricts';

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.save = async (data) => {
    let user = new User(data);

    return user.save().then(res=>{
        res.password = '';
        return res;
    });
}

exports.authenticate = async (data) => {
    var res = await user.findOne({
                            email: data.email,
                            password: data.password
                        });
    return res;
}

exports.getById = async (id) => {
    var res = await user.findById(id);
    return res;
}
