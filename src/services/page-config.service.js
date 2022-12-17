const repository = require('../repository/page-config.repository');
const excelReader = require('../_common/excel-reader');
const config = require('../config/config');

// Public Function
// const refresh = async () => {
//     let excelData = {};
//     excelReader.getExcelData(config.fileUrl.pageConfigFileUrl).then((data) => {
//         data['pages'].map((page) => {
//             const pageId = page['id'];
//             repository.save(pageId, getPageJSON(pageId));
//         });
//     });
// };

const getPageConfig = async (pageId) => {
    console.log(`Service::GetPageConfig with params ${pageId}`);
    return repository.get(pageId);
};

module.exports = { getPageConfig };
