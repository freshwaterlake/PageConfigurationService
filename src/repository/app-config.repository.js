const db = require('../_common/db');

const save = (dataKey, dataValue) => {
    const query = `INSERT INTO app_config.app_config
            (data_key, data_value, updated_by, version_num, created_at, updated_at)
        VALUES 
            (?, ?, ?, ?, NOW(), NOW())
        ON DUPLICATE KEY
        UPDATE 
            data_value  = VALUES(data_value), 
            updated_by  = VALUES(updated_by), 
            version_num = VALUES(version_num), 
            updated_at  = NOW()`;

    // Note: We need to convert the JSON Object into JSON String. Otherwise we will get column mismatch error
    return new Promise((resolve, reject) =>
        db.getPool().query(query, [dataKey, JSON.stringify(dataValue), 'SYSTEM', 1], (err, result) => (err ? reject(err) : resolve(result)))
    );
};

const get = async (dataKey) => {
    const query = 'SELECT data_value FROM app_config.app_config WHERE data_key = ?';

    return new Promise((resolve, reject) =>
        db.getPool().query(query, [dataKey], (err, result) => (err ? reject(err) : resolve(result[0]['data_value'])))
    );
};

module.exports = { save, get };
