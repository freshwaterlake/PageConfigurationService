const httpStatus = require('http-status');
const catchAsync = require('../utils/catch-async');
const { pageConfigService } = require('../services');

const getPageConfig = catchAsync(async (req, res) => {
    console.log(`GetPageConfig with params ${req.params.pageId}`);
    const pageConfig = await pageConfigService.getPageConfig(req.params.pageId);
    res.status(httpStatus.OK).send(pageConfig);
});

module.exports = { getPageConfig };
