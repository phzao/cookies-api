'use strict';

const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const config = require('./config');

const app = express();
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);
console.log('connection', config.connectionString);
const Customer = require('./models/customer');

const indexRoute = require('./routes/index-route');
const customerRoutes = require('./routes/customer-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/.netlify/functions/api', indexRoute);
app.use('/.netlify/functions/api/customers', customerRoutes);

module.exports.handler = serverless(app);