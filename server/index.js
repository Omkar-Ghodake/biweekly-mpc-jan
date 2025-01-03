const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const dbConnection = async () => {
  await connectToMongo()
}
dbConnection()

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/detectives-data', require('./routes/detectivesData'))

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
