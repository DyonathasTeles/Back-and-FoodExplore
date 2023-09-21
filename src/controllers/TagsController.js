const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class UsersController {
  async create(request, response) {
    const {name, email, password} = request.body

    const checkUserExist = await knex("users").where({email})

    if (checkUserExist.length > 0) {
      throw new AppError("This email is already in use")
    }

    response.status(201).json()
  }

  async update(request, response) {
    const {name, email, password} = request.body
    const { user_id } = request.params

    const checkEmailExist = await await knex("users").where({email})
    const user = await await knex("users").where({id: user_id})
    console.log(user);
    
    if(!user.length) {
      throw new AppError("The user does not exist")
    }

    if (checkEmailExist && checkEmailExist.id !== user.id) {
      throw new AppError("This email is already in use")
    }
    
    await knex("users").where({id: user_id}).update({name})
    
    response.json()
  }

  async index(request, response) {
  }

  async delete(request, response) {
  }
}

module.exports = UsersController