const authService = require('../api/auth/auth.service')
const logger = require('../services/logger.service')

function requireAuth(req, res, next) {
  if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedUser = authService.validateToken(req.cookies.loginToken)
  if (!loggedUser) return res.status(401).send('Not Authenticated')
  next()
}

// module.exports = requireAuth

module.exports = {
  requireAuth,
}
