'use stricts';

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.save = async (data) => {
    const user = new User(data);

    return user.save().then(res=>{
        res.password = '';
        return res;
    });
}

exports.authenticate = async ({email, password}) => {
    const res = await User.findOne({
        email: email,
        password: password
    });

    return res;
}

exports.getById = async (id) => {
    const res = await User.findById(id);

    return res;
}
