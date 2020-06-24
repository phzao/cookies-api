'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/delivery-controller');
const authService = require('../services/auth-service');

router.post('', authService.authorize, controller.post);
// router.put('/:id', authService.authorize, controller.update);
router.get('', authService.authorize, controller.getAllWithoutFilter);

module.exports = router; 
