const oldRepository = require('../repository/domain-data.repository');
const repository = require('../repository/app-config.repository');

const refresh = () => {
    oldRepository.get().then((data) => repository.save('DOMAIN_DATA', data));
    // excelReader.getExcelData(config.fileUrl.domainDataFileUrl).then((data) => {
    //     repository.save('DOMAIN_DATA', data['domain']);
    // });
};

module.exports = { refresh };
