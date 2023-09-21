const { Router } = require("express")
const userRouter = require("./users.routes")
const dishRouter = require("./dishes.routes")
const sessionRouter = require("./sessions.routes")

const routes = Router()

routes.use("/users", userRouter)
routes.use("/dishes", dishRouter)
routes.use("/sessions", sessionRouter)

module.exports = routes
