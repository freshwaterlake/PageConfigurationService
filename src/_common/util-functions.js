const isEmpty = (obj) => {
    if (obj === null || obj === undefined) return true;
    if (Array.isArray(obj) && obj.length === 0) return true;
    return Object.entries(obj).length === 0 ? true : false;
};

module.exports = { isEmpty };
