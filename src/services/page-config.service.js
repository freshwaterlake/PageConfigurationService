const repository = require('../repository/page-config.repository');

const getPageConfig = async (pageId) => {
    // console.log(`Service::GetPageConfig with params ${pageId}`);
    return repository.get(pageId);
};

module.exports = { getPageConfig };
