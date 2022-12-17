const db = require('../_common/db');

const save = (dataKey, dataValue) => {
    const query = `INSERT INTO app_config.app_config(data_key, data_value, created_at, updated_at, updated_by, version)
        VALUES (?, ?, NOW(), NOW(), 'SYSTEM', 1)
        ON DUPLICATE KEY
        UPDATE data_value = VALUES(data_value), updated_at = NOW(), updated_by='SYSTEM', version = `;

    return new Promise((resolve, reject) =>
        db.getPool().query(query, [dataKey, dataValue], (err, result) => (err ? reject(err) : resolve(result)))
    );
};

const get = async (dataKey) => {
    const query = 'SELECT data_value FROM app_config.app_config WHERE data_key = ?';

    return new Promise((resolve, reject) =>
        db.getPool().query(query, [dataKey], (err, result) => (err ? reject(err) : resolve(result[0]['data_value'])))
    );
};

module.exports = { save, get };
