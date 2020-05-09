'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

router.post('', authService.authorize, controller.post);
router.put('', authService.authorize, controller.post);
router.get('', authService.authorize, controller.get);

module.exports = router;