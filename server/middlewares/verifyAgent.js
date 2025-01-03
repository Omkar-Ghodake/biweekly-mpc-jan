const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

module.exports = verifyAgent = (req, res, next) => {
  const { authToken } = req.body

  if (!authToken) {
    return res
      .status(401)
      .json({ success: false, message: 'Unauthorised Access.' })
  }

  try {
    const data = jwt.verify(authToken, JWT_SECRET)

    req.agent = data.agent

    next()
  } catch (error) {
    res.json({ success: false, message: 'Server error occurred.' })
    console.error(error)
  }
}
