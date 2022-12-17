const httpStatus = require('http-status');
const catchAsync = require('../utils/catch-async');
const { dataLoaderService } = require('../services');

const refresh = catchAsync(async (req, res) => {
    console.log(`DataLoaderController with ${JSON.stringify(req.body)}`);
    const status = await dataLoaderService.refresh(req.body['entity']);
    res.status(httpStatus.OK).send();
});

module.exports = { refresh };
