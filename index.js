// Start of Imports
const nodeGen = require('./nodeGen.js');
const db = require('./db.js');
const excel = require('./excelReader.js');

// Logic Starts
const pages = ['higherStudiesPreferences'];
excel.getExcelData().then((data) => {
    pages.map((page) => {
        const pageJson = nodeGen.getPageJSON(page, data);
        db.savePage(page, JSON.stringify(pageJson));
    });
});

// Exit after successfully executing the script
console.log('-----Done----');
setTimeout(() => process.exit(), 3000);
