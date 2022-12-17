const express = require('express');
const dataLoaderController = require('../../controllers/data-loader.controller');

const router = express.Router();

router.route('/').post(dataLoaderController.refresh);

module.exports = router;
