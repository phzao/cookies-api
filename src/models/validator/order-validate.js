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

ValidateOrder.prototype.isValid = (body, res, response) => {
    let contract = new ValidationContract();

    contract.hasMinLen(body, 'to', 2, 'Nome é obrigatório e deve possuir no mínimo 2 caracteres');
    contract.hasMinLen(body, 'street', 10, 'Rua é obrigatório e deve possuir no mínimo 10 caracters');
    contract.hasMinLen(body, 'number', 1, 'Número é obrigatório e deve possuir no mínimo 1 caracters');
    contract.hasMinLen(body, 'province', 5, 'Bairro/Setor é obrigatório e deve possuir no mínimo 5 caracters');
    contract.hasMinLen(body, 'city', 3, 'Cidade é obrigatório e deve possuir no mínimo 3 caracters');
    contract.hasExacLen(body, 'state', 2, 'Estado é obrigatório.');
    contract.isArrayGreaterThan(body, 'items', 1, 'Deve ter ao menos 1 item no pedido.')
    if (!contract.isValid()) {
        response.responseUnprocessableEntity(res, contract.errors());
        return;
    }
};

module.exports = ValidateOrder;