const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class FavoritesController {
  async create(request, response) {
    const { id } = request.params
    const user_id  = request.user.id
    
    const favoriteExist = knex("favorites").select("id").where({id, user_id})
    if (favoriteExist.length) {
      throw new AppError("dish error favorite")
    }
     
    await knex("favorites").insert({user_id, dish_id: id})

    response.json({message:"dish added to favorite"})
  }

  async index(request, response) {
    const user_id  = request.user.id

    const data = await knex("favorites").where({user_id}).join("dishes", "favorites.dish_id", "=", "dishes.id")
    .select("dishes.id", "dishes.name", "dishes.price", "dishes.avatar").orderBy("name")

    response.json(data)
  }

  async delete (request, response) {
    const {id} = request.params

    const del = await knex("favorites").where({dish_id: id}).delete()

    if (!del) {
      throw new AppError("dish not found", 404)
    }

    response.json()
  }
}

module.exports = FavoritesController