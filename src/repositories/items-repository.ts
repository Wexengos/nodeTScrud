import Item from '../models/item';
import database from './database';

/* STUDY SQL interaction with back-end */

const itemsRepository = {
    // item to insert    function to be called
    create: (item: Item, callback: (id?: number) => void) => {
        console.log("Item: ", item)
        const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
        const params = [item.name, item.description]
        database.run(sql, params, function (_err) {
            callback(this?.lastID)
        })
    },

    readAll: (callback: (items: Item[]) => void) => {
        const sql = 'SELECT * FROM items';
        const params: any[] = [];
        database.all(sql, params, (_err, rows) => callback(rows))
    },

    read: (id: number, callback: (item?: Item) => void) => {
        const sql = 'SELECT * FROM items WHERE id = ?';
        const params = [id];
        database.get(sql, params, (_err, row) => callback(row))
    },

    update: (id: number, item: Item, callback: (notFound: boolean) => void) => {
        console.log('item: ', item, ' id: ', id)
        const sql = 'UPDATE items SET name = ?, description = ? WHERE id = ?'
        const params = [item.name, item.description, id];
        database.run(sql, params, function (_err) {
            callback(this?.changes === 0);
        })
    },

    delete: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM items WHERE id = ?'
        const params = [id];

        database.run(sql, params, function (_err) {
            callback(this?.changes === 0);
        })
    }
}

export default itemsRepository;