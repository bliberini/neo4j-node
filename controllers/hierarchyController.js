const hierarchyService = require('../services/hierarchyService');

module.exports.get = async (req, res) => {
    const results = await hierarchyService.get();
    if (results === null) {
        res.status(404).end();
    } else {
        res.json(results);
    }
};
