const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const News = require('../models/news');
const User = require('../models/user');

exports.getNewsList = (req, res, next) => {
    const currentPage = +req.query.page || 1;
    const perPage = +req.query.limit || 5;
    let totalItems;
    News.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            return News.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
                .sort({createdAt: 'descending'});
        })
        .then(news => {
            res.status(200).json({
                message: 'Fetched news successfully.',
                news: news,
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

exports.getNews = (req, res, next) => {
    const newsId = req.params.newsId;
    News.findById(newsId)
        .then(news => {
            if (!news) {
                const error = new Error('Could not find news.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'News fetched.', news: news });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
