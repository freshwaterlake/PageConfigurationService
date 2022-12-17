const httpStatus = require('http-status');
const catchAsync = require('../utils/catch-async');
const { appConfigService } = require('../services');

const getAppConfig = catchAsync(async (req, res) => {
    const appConfig = await appConfigService.getAppConfig(req.params.dataKey);
    res.status(httpStatus.OK).send(appConfig);
});

module.exports = { getAppConfig };
