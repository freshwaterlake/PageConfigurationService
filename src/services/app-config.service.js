const repository = require('../repository/app-config.repository');

// Public Function
const getAppConfig = async (dataKey) => {
    return repository.get(dataKey);
};

module.exports = { getAppConfig };
