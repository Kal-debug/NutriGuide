// src/server/middleware/auth.js
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const header = req.headers.authorization || ''
  const token  = header.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}
