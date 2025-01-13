const multer = require('multer')

module.exports = uploadImage = () => {
  try {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './uploads/images')
      },
      filename: (req, file, cb) => {
        cb(null, req.domain_name + '.png')
      },
    })

    const upload = multer({
      storage: storage,
      limits: { fileSize: 5000000 },
      fileFilter: fileFilter,
    })

    console.log('upload:', upload)

    next()
  } catch (error) {
    // res.json({ success: false, message: 'Server error occurred.' })
    console.error(error)
  }
}
