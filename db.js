const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'leeroyspets',
    password: 'F1kJm794x?', // make sure that this is set to your database password
    port: 5432,
});

module.exports = pool;