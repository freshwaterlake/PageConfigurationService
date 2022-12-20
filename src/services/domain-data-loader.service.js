const repository = require('../repository/app-config.repository');
const excelReader = require('../_common/excel-reader');
const config = require('../config/config');

const refresh = () => {
    excelReader.getExcelData(config.fileUrl.domainDataFileUrl).then((data) => {
        repository.save('DOMAIN_DATA', data['domain']);
    });
};

module.exports = { refresh };
