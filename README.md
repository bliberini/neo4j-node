# Instructions

1. In a terminal, navigate to the root of this project and run `npm install`.
2. Modify the `config.json` file with information of your Neo4j database:
    * Add its bolt URL under `url`.
    * Add its user and password under `user` and `password` respectively.
3. In a terminal, execute `node migration.js`. This will run the migration script for the database.
4. In a terminal, execute `node index.js`. This will mount and run the Express webserver, by default in port 3000.
    * You can change the default port by modifying the process environment variable `PORT`.
5. Open a browser and navigate to `http://localhost:3000` (or `http://localhost:PORT` if you modified the port). This will show you the hierarchy.