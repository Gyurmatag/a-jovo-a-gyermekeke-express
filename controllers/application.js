const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Application = require('../models/application');
const User = require('../models/user');

exports.getApplicationList = (req, res, next) => {
    const currentPage = +req.query.page || 1;
    const perPage = +req.query.limit || 5;
    let totalItems;
    Application.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            return Application.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
                .sort({implementationStart: 'descending'});
        })
        .then(applications => {
            console.log(applications)
            res.status(200).json({
                message: 'Fetched applications successfully.',
                applications: applications,
                totalItems: totalItems
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getApplication = (req, res, next) => {
    const applicationId = req.params.applicationId;
    Application.findById(applicationId)
        .then(application => {
            if (!application) {
                const error = new Error('Could not find application.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Application fetched.', application: application });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
