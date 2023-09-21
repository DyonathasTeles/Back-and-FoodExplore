const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfigs = require("../configs/auth")

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  if(!authHeader) {
    throw new AppError("JWT not informed", 401)
  }

  const [,token] = authHeader.split(" ")

  try {  
      const {role, sub:user_id } = verify(token, authConfigs.jwt.secret)

      request.user = {
        id: Number(user_id),
        role
      }

      return next()
  } catch {
    throw new AppError("Invalid JWT", 401)
  }

}

module.exports = ensureAuthenticated