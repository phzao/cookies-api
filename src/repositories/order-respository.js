'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.save = async (data) => {
    const order = new Order(data);

    return order.save()
                .then(res=>{return res;})
                .catch(err=>{console.log('order error save', err)});
}

exports.updateStatus = async (newStatus, id) => {
    const res = await Order.update({_id: id}, {$set:newStatus});
}
exports.getById = async (id) => {
    const res = await Order.findById(id);

    return res;
}

exports.getAllBy = async (parameters = {}) => {
    const res = await Order.find(parameters);

    return res;
}
