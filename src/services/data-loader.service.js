const pageConfigDataLoaderService = require('./page-config-data-loader.service');
const appConfigDataLoaderService = require('./app-config-data-loader.service');
const domainDataLoaderService = require('./domain-data-loader.service');

const refresh = async (entity) => {
    switch (entity) {
        case 'pageConfig':
            return pageConfigDataLoaderService.refresh();
        case 'activityConfig':
            return appConfigDataLoaderService.refresh();
        case 'domainData':
            return domainDataLoaderService.refresh();
        default:
            console.log(`Sorry, this file type: ${entity}, is not supported yet.`);
    }
};

module.exports = { refresh };
