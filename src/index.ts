import express from 'express';
import itemsRouter from "./routers/items-router";
import cors from 'cors';

// Server PORT
const PORT = process.env.PORT || 4000;

// Server HOSTNAME
const HOSTNAME = process.env.HOSTNAME || 'http://localhost';

// Express App
const app = express();

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Root endpoint
app.get('/', (req, res) => {
    res.send('Bem-vindo!')
})

// Cors
app.use(cors({
    origin: ['http://localhost:3000']
}))

// Routes
app.use('/api', itemsRouter)

// Standard response for any other requests:
app.use((req, res) => {
    res.status(404)
})

// Server start:
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})