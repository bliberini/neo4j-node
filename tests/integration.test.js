const neo4j = require('neo4j-driver');
const config = require('../config.json');
const hierarchyService = require('../services/hierarchyService');

const driver = neo4j.driver(config.url, neo4j.auth.basic(config.user, config.pass));

const cleanDB = async () => {
    const session = driver.session();
    await session.run('MATCH (n:Node) DETACH DELETE n');
};

const createHierarchy = async (node) => {
    const session = driver.session();
    await session.run(`
        CREATE (n:Node { name: 'A', description: 'Description of A' })
        CREATE (m:Node { name: 'B', description: 'Description of B' })
        CREATE (n)-[:PARENT_TO]->(m)
    `);
};

describe('Integration tests', () => {
    beforeAll(async () => {
        await cleanDB();
    });

    afterAll(async () => {
        await driver.close();
    });

    test('If there aren\'t any nodes, service should return an empty object', async () => {
        const result = await hierarchyService.get();
        expect(result).toHaveLength(0);
    });

    test('If there is a node, it maps the name and description fields properly', async () => {
        await createHierarchy();
        const result = await hierarchyService.get();
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('A');
        expect(result[0].description).toBe('Description of A');
    });

    test('If there a node has a child it should have a property named parent_to', async () => {
        await createHierarchy();
        const result = await hierarchyService.get();
        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('parent_to');
    });

    test('If there a node doesn\' have a child, it shouldn\'t have a property named parent_to', async () => {
        await createHierarchy();
        const result = await hierarchyService.get();
        expect(result).toHaveLength(1);
        const childNode = result[0].parent_to;
        expect(childNode).not.toHaveProperty('parent_to');
    });
});
