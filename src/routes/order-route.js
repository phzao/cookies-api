'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');

router.post('', authService.authorize, controller.post);
router.get('', authService.authorize, controller.get);
router.put('/:id/processing', authService.authorize, controller.processingOrder);

module.exports = router;