const repository = require('../repository/app-config.repository');
const excelReader = require('../_common/excel-reader');
const config = require('../config/config');

const refresh = () => {
    console.log(`Trying to read the file : ${config.fileUrl.activityConfigFileUrl}`);

    excelReader.getExcelData(config.fileUrl.activityConfigFileUrl).then((data) => {
        const activityGroups = [];
        data['activityGroup'].map((group) => activityGroups.push(getActivityGroupJson(group['id'], data)));
        repository.save('ACTIVITY_CONFIG', activityGroups);
    });
};

const getActivityGroupJson = (groupId, data) => {
    const groupRecord = data['activityGroup'].find((rec) => rec.id === groupId);
    return { ...groupRecord, activities: data['activities'].filter((rec) => rec.groupId === groupId) };
};

module.exports = { refresh };
