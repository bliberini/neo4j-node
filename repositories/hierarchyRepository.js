const neo4j = require('neo4j-driver');
const config = require('../config.json');

module.exports.getAll = async () => {
    const driver = neo4j.driver(config.url, neo4j.auth.basic(config.user, config.pass));
    const session = driver.session();
    const results = await session.run(`
        MATCH p=(n:Node)-[:PARENT_TO*]->(m)
        WHERE NOT (:Node)-[:PARENT_TO]->(n)
        WITH COLLECT(p) AS ps
        CALL apoc.convert.toTree(ps) yield value
        RETURN value
    `);

    await driver.close();

    // eslint-disable-next-line no-underscore-dangle
    return results.records.map((x) => x._fields);
};
