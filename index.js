const express = require('express');
const dotEnv = require('dotenv')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');
const applicationRoutes = require('./routes/application');

const index = express();

dotEnv.config();
index.use(bodyParser.json());

index.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

index.use('/feed', feedRoutes);
index.use('/application', applicationRoutes);

index.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(
        process.env.MONGODB_URI
    )
    .then(_ => {
        console.log("App started")
        index.listen(process.env.PORT);
    })
    .catch(err => console.log(err));
