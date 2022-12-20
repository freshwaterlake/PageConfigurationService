const httpStatus = require('http-status');
const catchAsync = require('../utils/catch-async');
const { appConfigService } = require('../services'); // Note: Giving full path is causing problem. Need to check why.

const getAppConfig = catchAsync(async (req, res) => {
    const appConfig = await appConfigService.getAppConfig(req.params.dataKey);
    res.status(httpStatus.OK).send(appConfig);
});

module.exports = { getAppConfig };
