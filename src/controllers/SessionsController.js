const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const authConfigs = require("../configs/auth")
const { compare } = require("bcryptjs")
const { sign } = require("jsonwebtoken")

class SessionsController {
  async create(request, response) {
    const {email, password} = request.body

    const user = await knex("users").where({ email }).first()

    if(!user) {
      throw new AppError("incorrect email or password")
    }

    const passwordCompare = await compare(password, user.password)

    if(!passwordCompare) {
      throw new AppError("incorrect email or password", 401)
    }

    const {expiresIn, secret} = authConfigs.jwt

    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({user, token})
  }
} 

module.exports = SessionsController