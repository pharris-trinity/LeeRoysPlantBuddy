const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'leeroyspets',
    password: 'F1kJm794x?',
    port: 5432,
});

module.exports = pool;