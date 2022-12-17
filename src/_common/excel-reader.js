const XLSX = require('xlsx');
const request = require('request');

const getExcelData = async (fileUrl) => {
    const excelData = {};

    return new Promise((resolve, reject) => {
        request.get(fileUrl, { encoding: null }, function (err, res, data) {
            if (err || res.statusCode != 200) {
                reject(res.statusCode);
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
