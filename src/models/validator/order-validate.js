'use strict';

let order = {};

const ValidationContract = require('../../validators/fluent-validator');

function ValidateOrder() {
    order = {};
}

ValidateOrder.prototype.set = (body) => {
    order = {
        name: body.name || null,
        address: body.address || null,
        cep: body.cep || null,
        items: body.items || null,
        total_general: 0,
        paid_at: body.paid_at || null,
        observation: body.observation || null,
        delivery_by: body.delivery_by || null,
        total_freight: body.total_freight || null,
        email: body.email || null
    };
};

ValidateOrder.prototype.sumItems = () => {
    if (order.items.length > 0) {
        let total = 0;
        order.items = order
            .items
            .map(item=>{

                const unit_total = (parseInt(item.quantity) * parseFloat(item.price));
                total += unit_total;

                return Object.assign({}, item, {total: unit_total});
            });

        order.total_general = total;
    }
};

ValidateOrder.prototype.get = () => {
    return order;
};

ValidateOrder.prototype.isValid = (body) => {
    let contract = new ValidationContract();

    contract.hasMinLen(body, 'name', 2, 'Nome é obrigatório e deve possuir no mínimo 2 caracteres');
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
