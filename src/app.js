const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const routes = require('./routes/v1');
const ApiError = require('./utils/api-error');
const morgan = require('./config/morgan');
const { errorHandler } = require('./middleware/error');
const httpStatus = require('http-status');

const app = express();
app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
// app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());
app.use('/api/v1', routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorHandler);

module.exports = app;

// // Start of Imports
// const nodeGen = require('./deleteme/nodeGen.js');
// const db = require('./deleteme/db.js');
// const excel = require('./deleteme/excelReader.js');

// // Logic Starts
// // excel.getExcelData().then((data) => {
// //     data['pages'].map((page) => {
// //         const pageJson = nodeGen.getPageJSON(page.id, data);
// //         db.savePage(page.id, JSON.stringify(pageJson));
// //     });
// // });

// excel.getExcelData().then((data) => console.log(data));

// // Exit after successfully executing the script
// console.log('-----Done----');
// setTimeout(() => process.exit(), 6000);
