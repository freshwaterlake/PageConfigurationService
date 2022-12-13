const express = require('express');
const db = require('./db.js');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/config/page/:pageName', (req, res) => {
    db.getPageConfig(req.params['pageName'], res);
});

app.listen(port, () => {
    console.log(`Example app listening on post ${port}`);
});
