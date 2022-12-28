const express = require("express");
const jobPostController = require("../../controllers/job-post.controller");

const router = express.Router();

router.route("/createPost").post(jobPostController.createPost);

module.exports = router;
