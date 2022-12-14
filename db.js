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

const saveSection = (sectionName, json) => {
    const query = 'INSERT INTO app_config.section_config(section_name, section_json, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
    getPool().query(query, [sectionName, json]);
};

const savePage = (pageName, json) => {
    const query = `INSERT INTO app_config.page_config(page_name, page_json, created_at, updated_at)
        VALUES (?, ?, NOW(), NOW())
        ON DUPLICATE KEY
        UPDATE page_json = VALUES(page_json), updated_at = NOW()`;

    getPool().query(query, [pageName, json]);
};

const getPageConfig = (pageName, res) => {
    const query = 'SELECT page_json FROM app_config.page_config WHERE page_name = ?';
    getPool().query(query, [pageName], (err, result) => {
        if (err) throw err;
        res.json(result[0]['page_json']);
    });
};

const deleteSections = () => {
    const query = 'DELETE FROM app_config.section_config';
    getPool().query(query);
};

module.exports = { getPool, savePage, saveSection, deleteSections, getPageConfig };
