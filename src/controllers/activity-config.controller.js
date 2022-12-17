const httpStatus = require('http-status');
const catchAsync = require('../utils/catch-async');
const { activityConfigService } = require('../services');

const refresh = catchAsync(async (req, res) => {
    const status = await activityConfigService.refresh();
    res.status(httpStatus.OK).send();
});

const getActivityConfig = catchAsync(async (req, res) => {
    const activityConfig = await activityConfigService.getActivityConfig(req.params.pageId);
    res.status(httpStatus.OK).send(activityConfig);
});

module.exports = { refresh, getPageConfig: getActivityConfig };
