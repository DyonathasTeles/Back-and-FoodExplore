const { Router } = require("express")

const FavoritesController = require("../controllers/FavoritesController")

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const favoriteRouter = Router()
const favoritesController = new FavoritesController()

favoriteRouter.use(ensureAuthenticated)

favoriteRouter.post("/:id", favoritesController.create)
favoriteRouter.get("/", favoritesController.index)
favoriteRouter.delete("/:id", favoritesController.delete)

module.exports = favoriteRouter