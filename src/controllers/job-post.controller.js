const httpStatus = require("http-status");
const catchAsync = require("../utils/catch-async");
const { jobPostService } = require("../services");

const createPost = catchAsync(async (req, res) => {
  const jobPost = await jobPostService.createPost(req.params.pageId);
  res.status(httpStatus.OK).send(jobPost);
});

module.exports = { createPost };
