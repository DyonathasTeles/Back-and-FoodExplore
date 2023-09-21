const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class DishesController {
  async create(request, response) {
    const {name ,avatar, category, price, description, tags} = request.body

    const [dish_id]  = await knex("dishes").insert({
      name, avatar, category, price, description,
    }) 

    const tagsInsert = tags.map(name => {
      return {
        dish_id,
        name
      }
    })

    await knex("tags").insert(tagsInsert)

    return response.status(201).json()
  }

  async update(request, response) {
    const {id} = request.params
    const {name, category, price, description, avatar, tags} = request.body

    const dish = await knex("dishes").where({id}).first()
    console.log(dish);
    

    if(!dish){
      throw new AppError(" dish not found ")
    }

    await knex("dishes").where({id}).first().update({name, category, price, description, avatar, updated_at: knex.fn.now()})
    await knex("tags").where({dish_id: id}).first().update({name: tags})

    response.json()
  }

   async index(request, response) {
    const { search } = request.query

    try {
      let dishequery

      dishequery = await knex("dishes").orderBy("dishes.name")
      console.log(dishequery);
      console.log(search);
  

      if(search) {

        dishequery = await knex("dishes")
        .join("tags", "dishes.id", "=", "tags.dish_id")
        .select("dishes.id as id","dishes.name as dish", "tags.name as tag" )
        .where("dish", "like", `%${search}%`)
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