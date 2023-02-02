const HttpStatus = require('http-status-codes')
const userSchema = require('../database/models/user.model')

const authMiddleware = {

  isVerified: async (req, res, next) => {
    const token = req.headers.authorization;
    const decodeToken = jwt.verify(token, process.env.SECRET_TOKEN);

    const user = await userSchema.findById(decodeToken.userId);

    if (!user || !user.verified) {
      return res.status(HttpStatus.FORBIDDEN).json({ error: 'Veuillez valider votre adresse mail .' })
    }

    return next()
  },
  isAuthenticate: async (req, res, next) => {

    if (!req.headers.authorization || !req.headers.authorization?.startsWith('Bearer')) {
      return res.status(401).json({
        status: 401,
        message: 'utilisateur non authentifier'
      })
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.verify(token, process.env.SECRET_TOKEN);

    const user = await userSchema.findById(decodeToken.userId);
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: 'utilisateur non authentifier'
      })
    }
    req.user = user;
    return next()
  },
  authorize: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          status: 'ACCEES REFUSER'
        })
      }
    }
  }
}

module.exports = authMiddleware
