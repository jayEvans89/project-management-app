import express from 'express'
import cors from 'cors'
import { databaseConnect } from './config/database'
import { router } from './routes/route'

const app = express()
const port = 3001

databaseConnect()

const corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:8082', 'http://localhost:3000'],
  credentials: true
}

app.use(express.json())
app.use(cors(corsOptions))

app.use('/api', router)

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`)
})