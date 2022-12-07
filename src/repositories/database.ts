import sqlite3 from 'sqlite3';

const DBSOURCE = 'db.sqlite';

const SQL_ITEMS_CREATE = `
    CREATE TABLE items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT
    )`

const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Database connected successfully')
        database.run(SQL_ITEMS_CREATE, (err) => {
            if (err) {
                // table might have already been created
            } else {
                console.log('Items table created successfully')
            }
        })
    }
})

export default database;