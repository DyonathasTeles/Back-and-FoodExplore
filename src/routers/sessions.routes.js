const { Router } = require("express")

const SessionsController = require("../controllers/SessionsController")

const sessionRouter = Router()
const sessionsController = new SessionsController()

sessionRouter.post("/", sessionsController.create)

module.exports = sessionRouter