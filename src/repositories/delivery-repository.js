'use strict';

const mongoose = require('mongoose');
const Delivery = mongoose.model('Delivery');

exports.save = async (data) => {
    const delivery = new Delivery(data);

    return delivery.save()
        .then(res=>{return res;})
        .catch(err=>{console.log('delivery error save', err)});
}

exports.getById = async (id) => {
    const res = await Delivery.findById(id);

    return res;
}

exports.getByIdAndStatus = async (id, status='enable') => {
    const res = await Delivery.find({
        _id:id, 
        status: status
    }, {
        _id:1,
        name: 1
    });

    return res;
} 

exports.getAllBy = async (parameters = {}) => {
    const res = await Delivery.find(parameters);

    return res;
}
