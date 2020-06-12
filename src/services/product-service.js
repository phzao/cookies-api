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

        const products = await Promise.all(
            list.map(item=>{
                if (item.product_id === undefined) {
                    return;
                }
                return repository.getByIdAndStatus(item.product_id);
            }));
        console.log("products", products);

    }
}

module.exports = ProductService;
