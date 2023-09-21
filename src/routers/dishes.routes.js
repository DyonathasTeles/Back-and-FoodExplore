const { Router } = require("express")

const DishesController = require("../controllers/DishesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const dishRouter = Router()
const dishesController = new DishesController()

dishRouter.use(ensureAuthenticated)
dishRouter.use(verifyUserAuthorization)

dishRouter.post("/", dishesController.create)
dishRouter.delete("/:id", dishesController.delete)
dishRouter.get("/", dishesController.index)
dishRouter.get("/:id", dishesController.show)
dishRouter.put("/:id", dishesController.update)

module.exports = dishRouter