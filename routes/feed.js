const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/news', feedController.getNewsList);

router.get('/news/:newsId', feedController.getNews);

module.exports = router;
