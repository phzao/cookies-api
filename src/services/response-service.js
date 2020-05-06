'use-stricts';

exports.responseCreated = (res, jsonData, headers) => {
    res.status(201).send({
        status: 'success',
        data: jsonData
    });
}

exports.responseUnprocessableEntity = (res, jsonData, headers) => {
    res.status(422).send({
        status: 'fail',
        data: jsonData
    }).end();
}