# Instructions

## To run solutions

1. Create a database in Neo4j and assign credentials to it.
2. Install the [APOC](https://neo4j.com/developer/neo4j-apoc/) plugin in your Neo4j database and enable it in the database you created.
3. In a terminal, navigate to the root of this project and run `npm install`.
4. Modify the `config.json` file with information of your Neo4j database:
    * Add its bolt URL under `url`.
    * Add its user and password under `user` and `password` respectively.
5. In a terminal, execute `node migration.js`. This will run the migration script for the database.
6. In a terminal, execute `node index.js`. This will mount and run the Express webserver, by default in port 3000.
    * You can change the default port by modifying the process environment variable `PORT`.
7. Open a browser and navigate to `http://localhost:3000` (or `http://localhost:PORT` if you modified the port). This will show you the hierarchy.

## To run tests

1. Run the same points 1-4 from the previous section. 
2. In a terminal, execute `npm run test`. 

**Note**: You will need to run the migration again to recover the DB.