// Start of Imports
const nodeGen = require('./nodeGen.js');
const db = require('./db.js');
const excel = require('./excelReader.js');

// Logic Starts
excel.getExcelData().then((data) => {
    data['pages'].map((page) => {
        const pageJson = nodeGen.getPageJSON(page.id, data);
        db.savePage(page.id, JSON.stringify(pageJson));
    });
});

// Exit after successfully executing the script
console.log('-----Done----');
setTimeout(() => process.exit(), 3000);
