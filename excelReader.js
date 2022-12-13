const XLSX = require('xlsx');
const request = require('request');

const fileURL =
    'https://docs.google.com/feeds/download/spreadsheets/Export?key=1mRYkMBgQx4qig3pd88zyRnkJXlMEoay634fLTv_Aoy0&exportFormat=xlsx';

const getExcelData = () => {
    let excelData = {
        pages: [],
        sections: [],
        sectionControls: [],
        controlProps: [],
        complexControls: [],
        breadCrumbs: [],
        controlTypeMaster: [],
    };

    return new Promise((resolve, reject) => {
        request.get(fileURL, { encoding: null }, function (err, res, data) {
            if (err || res.statusCode != 200) {
                console.log(res.statusCode);
                return;
            }
            const buf = Buffer.from(data);
            const workbook = XLSX.read(buf);

            const sheets = workbook.SheetNames;

            for (let i = 0; i < sheets.length - 1; i++) {
                excelData[workbook.SheetNames[i]] = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]]);
            }
            resolve(excelData);
        });
    });
};

module.exports = { getExcelData };
