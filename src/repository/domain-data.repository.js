const db = require('../_common/db');
const fc = require('../_common/util-functions');
var fs = require('fs');
path = require('path');

const get = async () => {
    const domainDataSQL = fs.readFileSync(path.join(__dirname, '..', 'sql', 'domain-data.sql')).toString();

    return new Promise((resolve, reject) =>
        db.getOldDBPool().query(domainDataSQL, (err, result) => {
            const data = fc.isEmpty(result) ? {} : result;
            err ? reject(err) : resolve(data);
        })
    );
};

module.exports = { get };
