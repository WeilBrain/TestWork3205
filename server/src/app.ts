import express from 'express'
import cors from 'cors'
import searchRoutes from './routes/searchRoutes'

const app = express()
const port = 3000

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));
app.use(express.json())
app.use(searchRoutes)

app.listen(port, () => {
    console.log(`Сервер запущен по адресу http://localhost:${port}`)
})
