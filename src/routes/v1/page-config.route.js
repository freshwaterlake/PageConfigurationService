const express = require('express');
const pageConfigController = require('../../controllers/page-config.controller');

const router = express.Router();

// router.route('/refresh').post(pageConfigController.refresh);

router.route('/:pageId').get(pageConfigController.getPageConfig);

module.exports = router;
