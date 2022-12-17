const db = require('../_common/db');

const save = (pageName, json) => {
    const query = `INSERT INTO app_config.page_config(page_name, page_json, created_at, updated_at)
        VALUES (?, ?, NOW(), NOW())
        ON DUPLICATE KEY
        UPDATE page_json = VALUES(page_json), updated_at = NOW()`;

    return new Promise((resolve, reject) =>
        db.getPool().query(query, [pageName, json], (err, result) => (err ? reject(err) : resolve(result)))
    );
};

const get = async (pageName) => {
    console.log(`Repository::GetPageConfig with params ${pageName}`);
    const query = 'SELECT page_json FROM app_config.page_config WHERE page_name = ?';

    // getPool().query(query, [pageName], (err, result) => {
    //     if (err) throw err;
    //     return result;
    // });

    return new Promise((resolve, reject) =>
        db.getPool().query(query, [pageName], (err, result) => (err ? reject(err) : resolve(result[0]['page_json'])))
    );
};

module.exports = { save, get };
