'use strict';

const repository = require('../repositories/product-respository');
let product = {};
let productList = [];

function ProductService() {
    product = {};
    productList = [];
}

ProductService.prototype.getProductListOrganized = async (list) => {

    if (typeof list !== undefined && 
        typeof list[Symbol.iterator] === "function" && 
        Object.keys(list).length > 0) {

        const getProduct = async id => {
            return repository
                .getByIdAndStatus(id)
                .then(res=>{
                    if (res) {
                        return Promise.resolve(res);
                    }
                });
        }

        const productList = list.map(item=>{
            if (item.product_id === undefined) {
                return false;
            }

            return getProduct(item.product_id)
                .then(res=>{
                    if (res.length > 0) {

                        let prod = res[0]._doc;
                        prod.quantity = item.quantity;
                        return prod;
                    }
                }); 
        });

        return Promise
            .all(productList)
            .then(res=>{
                return res.filter(item=>item);
            });
    }
}

module.exports = ProductService;
