import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.json({
        status: "active",
        message: "File Server API"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})