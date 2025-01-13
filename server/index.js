const { uploadFile } = require('./controllers/authController')
const path = require('path')
const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const multer = require('multer')
const fs = require('fs')
const upload = require('./controllers/upload')

const dbConnection = async () => {
  await connectToMongo()
}
dbConnection()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/images', express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/detectives-data', require('./routes/detectivesData'))
const port = process.env.PORT

// Create the uploads directory if it doesn't exist
const uploadDir = './uploads'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

// POST route to handle image upload
app.post('/api/upload', upload.single('image'), uploadFile)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
