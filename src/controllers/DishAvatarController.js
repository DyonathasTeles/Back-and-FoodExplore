const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const DiskStorage = require("../provider/diskStorage")

class DishAvatarController {
  async update(request, response) {
    const avatarFilename = request.file.filename
    const {id} = request.params

    const diskStorage = new DiskStorage()

    const dish = await knex("dishes").where({id})
    

    if (!dish) {
      throw new AppError(" o prato não existe")
    }

    if (dish.avatar) {
      await diskStorage.deleteFile(dish.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    dish.avatar = filename
    
    await knex("dishes").where({id}).update({avatar : filename})

    return response.status(201).json(dish)
  }
}

module.exports = DishAvatarController