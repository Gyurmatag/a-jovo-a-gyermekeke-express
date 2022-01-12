const express = require('express');

const applicationController = require('../controllers/application');

const router = express.Router();

router.get('/applications', applicationController.getApplicationList);

router.get('/application/:applicationId', applicationController.getApplication);

module.exports = router;
