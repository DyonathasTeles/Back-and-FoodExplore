const { Router } = require("express")

const DishesController = require("../controllers/DishesController")
const DishesAvatarController = require("../controllers/DishAvatarController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")
const uploadsConfig = require("../configs/upload")
const multer = require("multer")

const dishRouter = Router()
const dishesController = new DishesController()
const dishesAvatarController = new DishesAvatarController()
const upload = multer(uploadsConfig.MULTER) 

dishRouter.use(ensureAuthenticated)

dishRouter.post("/", verifyUserAuthorization(["admin"]), dishesController.create)
dishRouter.delete("/:id", verifyUserAuthorization(["admin"]), dishesController.delete)
dishRouter.get("/", dishesController.index)
dishRouter.get("/:id", dishesController.show)
dishRouter.put("/:id", verifyUserAuthorization(["admin"]), dishesController.update)
dishRouter.patch("/avatar/:id", verifyUserAuthorization(["admin"]), upload.single("avatar"), dishesAvatarController.update)
dishRouter.post("/avatar", verifyUserAuthorization(["admin"]), upload.single("avatar"), dishesAvatarController.create)


module.exports = dishRouter