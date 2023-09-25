require("express-async-errors")
require("dotenv/config")
const database = require("./database/sqlite")
const AppError = require("./utils/AppError")
const uploadsConfig = require("./configs/upload")

const express = require('express')
const cors = require("cors")
const routes = require("./routers")


const app = express()
app.use(cors()) 
app.use(express.json())

app.use("/files", express.static(uploadsConfig.UPLOADS_FOLDER))

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

