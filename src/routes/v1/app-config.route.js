const express = require('express');
const appConfigController = require('../../controllers/app-config.controller');

const router = express.Router();

// router.route('/refresh').post(pageConfigController.refresh);

router.route('/:dataKey').get(appConfigController.getAppConfig);

module.exports = router;
