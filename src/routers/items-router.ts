import express from 'express';

import Item from '../models/item';
import itemsRepository from "../repositories/items-repository"

const itemsRouter = express.Router();

const items: Item[] = [
    {
        id: 1,
        name: 'Product 1',
        description: 'Product 1 description'
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'Product 2 description'
    }
]

itemsRouter.post('/items', (req, res) => {
    const item: Item = req.body;

    itemsRepository.create(item, (id) => {
        if (id) {
            res.status(201).location(`/items/${id}`).send('Item added successfully.');
        } else {
            res.status(400).send('Error adding item.');
        }
    })
})

itemsRouter.get('/items', (req, res) => {
    itemsRepository.readAll((items) => res.json(items))
})

itemsRouter.get('/items/:id', (req, res) => {
    const id: number = +req.params.id;

    itemsRepository.read(id, (item) => {
        if (item) {
            res.json(item);
        } else {
            res.status(404).send('404 Item not Found.');
        }
    })
})

itemsRouter.put('/items/:id', (req, res) => {
    const id: number = +req.params.id;
    itemsRepository.update(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send('404 Item Not Found');
        } else {
            res.status(204).send('Successfully updated');
        }
    })
})

itemsRouter.delete('/items/:id', (req, res) => {
    const id: number = +req.params.id;
    itemsRepository.delete(id, (notFound) => {
        if (notFound) {
            res.status(404).send('404 Item Not Found');
        } else {
            res.status(204).send('Successfully deleted');
        }
    })
})

export default itemsRouter;