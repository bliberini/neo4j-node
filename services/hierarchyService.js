const hierarchyRepository = require('../repositories/hierarchyRepository');

const mapNodes = (node) => ({
    name: node.name,
    description: node.description,
    parent_to: node.parent_to ? node.parent_to.map(x => mapNodes(x)) : undefined,
});

module.exports.get = async () => {
    try {
        const results = await hierarchyRepository.getAll();
        return results[0]
            .filter((x) => Object.keys(x).length !== 0)
            .map((x) => mapNodes(x));
    } catch (ex) {
        console.error(`Error getting hierarchy: ${JSON.stringify(ex)}`);
        console.error(`Exception message: ${ex.message}`);
    }
    return null;
};
