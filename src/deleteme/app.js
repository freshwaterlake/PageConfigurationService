const express = require('express');
const db = require('./db.js');
var cors = require('cors');
const app = express();

const port = 3008;

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/config/page/:pageName', (req, res) => {
    db.getPageConfig(req.params['pageName'], res);
});

app.listen(port, () => {
    console.log(`Example app listening on post ${port}`);
});
