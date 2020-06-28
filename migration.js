const neo4j = require('neo4j-driver');
const config = require('./config.json');
const migrationData = require('./data.json');

const runMigration = async () => {
    console.log('Starting migration...');

    const driver = neo4j.driver(config.url, neo4j.auth.basic(config.user, config.pass));
    const session = driver.session();

    try {
        const relationships = migrationData.data
            .filter(node => node.parent && node.parent !== "")
            .map((node) => {
                return { name: node.name, parent: node.parent };
            });
        console.log('Creating nodes...');
        await session.run(`
            UNWIND $nodes AS node
            MERGE (n:Node { name: node.name, description: node.description })
        `, { nodes: migrationData.data });
        console.log('Creating relationships...');
        await session.run(`
            UNWIND $relationships as relationship
            MATCH (c:Node { name: relationship.name }), (p:Node { name: relationship.parent })
            MERGE (p)-[:PARENT_TO]->(c)
        `, { relationships: relationships });
    } catch (ex) {
        console.error(`There was an error migrating data: ${JSON.stringify(ex)}`);
        console.error(`Exception message: ${ex.message}`);
    }

    await driver.close();
    console.log('Migration finished');
};

runMigration();
