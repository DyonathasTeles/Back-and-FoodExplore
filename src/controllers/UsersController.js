const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const { hash } = require("bcryptjs")

class UsersController {
  async create(request, response) {
    const {name, email, password} = request.body

    const checkUserExist = await knex("users").where({email})

    if (checkUserExist.length > 0) {
      throw new AppError("This email is already in use")
    }

    const hashedPassword = await hash(password, 3)

    if (!name) {
      throw new AppError("name is mandatory!")
    }
    
    await knex("users").insert({name, email, password: hashedPassword})

    response.status(201).json()
  }
}

module.exports = UsersController