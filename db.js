const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'leeroyspets', // will crash upon switching pages if DB name is changed
    password: '', // this needs to be clear whenever you push to a branch for security reasons
    port: 5432,
});

module.exports = pool;