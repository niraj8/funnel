// Loading and initializing the library:
const pgp = require('pg-promise')({});

// Preparing the connection details:
const cn = process.env.DATABASE_URL;

// Creating a new database instance from the connection details:
const db = pgp(cn);

// Exporting the database object for shared use:
module.exports = db;