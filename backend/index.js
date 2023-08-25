import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload';
import { connectDB } from './config/db.js'
import api from './routes/api.js'

dotenv.config() // Load environment variables

const app = express()
app.use(express.json()) // To parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })) // To parse incoming requests with URL-encoded payloads
app.use(fileUpload()); // To parse incoming requests with file payloads
app.use(cors()) // To allow cross-origin requests

// Connect to MongoDB
connectDB()

// home route
app.get('/', (req, res) => {
    res.json({
        status: "active",
        message: "File Server API"
    })
})

// api routes
app.use('/api', api)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})