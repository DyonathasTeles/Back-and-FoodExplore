const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const DiskStorage = require("../provider/diskStorage")

class DishesController {
  async create(request, response) {
    const {name , category, price, description, tags} = request.body

    const [dish_id]  = await knex("dishes").insert({
      name, category, price, description,
    }) 

    const tagsInsert = tags.map(name => {
      return {
        dish_id,
        name
      }
    })

    await knex("tags").insert(tagsInsert)

    return response.status(201).json({dish_id})
  }

  async update(request, response) {
    const {id} = request.params
    const {name, category, price, description, avatar, tags} = request.body

    const dish = await knex("dishes").where({id}).first()

    if(!dish){
      throw new AppError(" dish not found ")
    }

    await knex("tags").where({dish_id: id}).delete()

    const tagsNames = tags.map(tag => {
      return {
        dish_id: id,
        name: tag
      }
    })

    await knex("dishes").where({id}).first().update({name, category, price, description, updated_at: knex.fn.now()})
    await knex("tags").insert(tagsNames)

    response.json()
  }

   async index(request, response) {
    const { search } = request.query

    try {
      let dishequery

      dishequery = await knex("dishes").orderBy("dishes.name")
  
      if(search) {

        dishequery = await knex("dishes")
        .join("tags", "dishes.id", "=", "tags.dish_id")
        .select("dishes.id as id","dishes.name", "tags.name as tag", "dishes.description",  "dishes.price", "dishes.avatar" )
        .where("dishes.name", "like", `%${search}%`)
        .orWhere("tag", "like", `%${search}%`)
        .groupBy("dishes.id")
      }
  
      return response.json(dishequery)

    } catch (error) {
      console.log(error);
      throw new AppError(error)
    }
  }

  async delete(request, response) {
    const {id} = request.params

    await knex("dishes").where({id}).delete()

    return response.json()
  }
  
  async show(request, response) {
    const {id} = request.params 

    const dish = await knex("dishes").where({id}).first()
    const tags = await knex("tags").where({dish_id: id}).orderBy("name")

    return response.json({
      ...dish,
      tags
    })
  }
  
}

module.exports = DishesController