require('dotenv').config();

let db;

const pgp = require('pg-promise')({
    query: (e) => console.log(e.query)
})

if (process.env.DATABASE_URL) {
    db = pgp(process.env.DATABASE_URL);
} else {
    db = pgp({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    });
}

module.exports = db;