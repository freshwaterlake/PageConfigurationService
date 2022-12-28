const db = require("../_common/db");
const fc = require("../_common/util-functions");

const createPost = (jobPost) => {
  const query = `INSERT INTO app_config.job_post
    (
        job_type_code, 
        title, 
        min_experience, 
        max_experience, 
        company_name, 
        location, 
        description, 
        posting_file_path,
        created_at,
        created_by
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`;

  const {
    jobTypeCode,
    title,
    minExperience,
    maxExperience,
    companyName,
    location,
    description,
    postingFilePath,
  } = { ...jobPost };

  return new Promise((resolve, reject) =>
    db
      .getPool()
      .query(
        query,
        [
          jobTypeCode,
          title,
          minExperience,
          maxExperience,
          companyName,
          location,
          description,
          postingFilePath,
          "SYSTEM",
        ],
        (err, result) => (err ? reject(err) : resolve(result))
      )
  );
};
