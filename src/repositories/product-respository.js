'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.save = async (data) => {
    const product = new Product(data);

    return product.save()
                    .then(res=>{return res;})
                    .catch(err=>{console.log('product error save', err)});
}

exports.getById = async (id) => {
    const res = await Product.findById(id);

    return res;
}

exports.getAllBy = async (parameters = {}) => {
    const res = await Product.find(parameters);

    return res;
}