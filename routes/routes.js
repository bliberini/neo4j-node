const hierarchyController = require('../controllers/hierarchyController');

module.exports = (app) => {
    app.get('/hierarchy', hierarchyController.get);
};
