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

const User = require('./models/user');

const indexRoute = require('./routes/index-route');
const userRoutes = require('./routes/user-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/.netlify/functions/api', indexRoute);
app.use('/.netlify/functions/api/users', userRoutes);

module.exports.handler = serverless(app);