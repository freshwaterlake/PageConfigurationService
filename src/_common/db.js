const mysql = require('mysql2');

const getPool = () =>
    mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'Rikon@612',
        database: 'app_config',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

const getOldDBPool = () =>
    mysql.createPool({
        host: 'univariety.xyz',
        user: 'naveen',
        password: 'n@v33n432',
        database: 'univarie_uni_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

module.exports = { getPool, getOldDBPool };
