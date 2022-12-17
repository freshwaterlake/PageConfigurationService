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

module.exports = { getPool };
