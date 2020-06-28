const hierarchyService = require('../services/hierarchyService');

module.exports = (app) => {
    app.get('/hierarchy', hierarchyService.get);
};
