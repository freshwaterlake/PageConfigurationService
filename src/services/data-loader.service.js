const pageConfigDataLoaderService = require('./page-config-data-loader.service');
const appConfigDataLoaderService = require('./app-config-data-loader.service');

const refresh = async (entity) => {
    switch (entity) {
        case 'pageConfig':
            return pageConfigDataLoaderService.refresh();
            break;
        case 'Mangoes':
            return appConfigDataLoaderService.refresh();
            break;
        default:
            console.log(`Sorry, we are out of ${expr}.`);
    }
};

module.exports = { refresh };
