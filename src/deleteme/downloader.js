const request = require('request');
const XLSX = require('xlsx');

const fileURL =
    'https://docs.google.com/spreadsheets/d/1mRYkMBgQx4qig3pd88zyRnkJXlMEoay634fLTv_Aoy0/export?format=xlsx&id=1mRYkMBgQx4qig3pd88zyRnkJXlMEoay634fLTv_Aoy0';

request.get(fileURL, { encoding: null }, function (err, res, data) {
    if (err || res.statusCode != 200) {
        console.log(res.statusCode);
        return;
    }
    const buf = Buffer.from(data);
    const workbook = XLSX.read(buf);

    var sheet1 = workbook.Sheets[workbook.SheetNames[0]];
    var sheet2 = workbook.Sheets[workbook.SheetNames[1]];
    // console.log(XLSX.utils.sheet_to_json(sheet1));
    // console.log(XLSX.utils.sheet_to_json(sheet2));
});
