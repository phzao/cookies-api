'use strict';

const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const config = require('./config');

const app = express();
const mongoose = require('mongoose');

mongoose.connect(config.connectionString, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const User = require('./models/user');
const Product = require('./models/product');

const indexRoute = require('./routes/index-route');
const employeeRoutes = require('./routes/employee-route');
const authenticateRoutes = require('./routes/user-route');
const productRoutes = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/.netlify/functions/api', indexRoute);
app.use('/.netlify/functions/api/employees', employeeRoutes);
app.use('/.netlify/functions/api/products', productRoutes);
app.use('/.netlify/functions/api/authenticate', authenticateRoutes);

module.exports.handler = serverless(app);