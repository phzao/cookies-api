'use strict';

let order = {};

const ValidationContract = require('../../validators/fluent-validator');

function ValidateOrder() {
    order = {};
}

ValidateOrder.prototype.set = (body) => {
    order = {
        to: body.to || null,
        address: {
            street: body.street || null,
            number: body.number || null,
            province: body.province || null,
            city: body.city || null,
            state: body.state || null
        },
        items: body.items || null
    };
};

ValidateOrder.prototype.sumItems = () => {
    if (order.items.length > 0) {
        let total = 0;
        order.items = order.items
            .map(item=>{
                let unit_total = (parseInt(item.quantity) * parseFloat(item.unit_price));
                total += unit_total;
                item.unit_total = unit_total;
                return item;
            });

        order.total_general = total;
    }
};

ValidateOrder.prototype.get = () => {
    return order;
};

ValidateOrder.prototype.isValid = (body) => {
    let contract = new ValidationContract();

    contract.hasMinLen(body, 'to', 2, 'Nome é obrigatório e deve possuir no mínimo 2 caracteres');
    contract.hasMinLen(body, 'address', 20, 'Endereço deve conter no mínimo 20 caracteres');
    contract.hasMaxLen(body, 'address', 300, 'Endereço deve conter no máximo 300 caracteres');
    contract.hasExacLen(body, 'cep', 8, 'Cep deve conter 8 digitos');
    contract.isArrayGreaterThan(body, 'items', 1, 'Deve ter ao menos 1 item no pedido.')

    return {
        isValid: contract.isValid(),
        errors: contract.errors()        
    };
};

module.exports = ValidateOrder;
