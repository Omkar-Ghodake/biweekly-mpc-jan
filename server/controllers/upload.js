// upload.js

const multer = require('multer')
const path = require('path')

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // specify the folder where the image will be saved
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname) // generate unique filename
  },
})

// Export the Multer instance with the 'image' field name
const upload = multer({ storage: storage })

module.exports = upload
