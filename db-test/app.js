const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'express',
    password: '6235',
    port: 5432,
});

client.connect();

client.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error("Error executing query", err.stack);
    } else {
        console.log(res.rows[0]);
    }
    client.end();
});