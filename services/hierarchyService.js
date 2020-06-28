const hierarchyRepository = require('../repositories/hierarchyRepository');

const mapNodes = (node) => {
    return {
        name: node.name,
        description: node.description,
        parent_to: node.parent_to ? node.parent_to.map(x => mapNodes(x)) : undefined,
    };
};

module.exports.get = async (req, res) => {
    try {
        const results = await hierarchyRepository.getAll();
        res.json(results[0].map(x => mapNodes(x)));
    } catch (ex) {
        console.error(`Error getting hierarchy: ${JSON.stringify(ex)}`);
        console.error(`Exception message: ${ex.message}`);
        res.status(404).end();
    }
};
