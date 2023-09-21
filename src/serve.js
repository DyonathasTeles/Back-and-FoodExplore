require("express-async-errors")
const database = require("./database/sqlite")
const AppError = require("./utils/AppError")

const Express = require('express')

const routes = require("./routers")


const app = Express()
app.use(Express.json())

app.use(routes)

database();

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status:"error",
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status:"error",
    message:"Internal serve error",
  })
})

const PORT = 7777

app.listen(PORT, () => console.log(`passei pela porta ${PORT}`))

