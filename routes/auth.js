const authController = require("../controller/authController")

const routes = require("express").Router()

routes.post("/register",authController.registerUser)

routes.post("/login",authController.loginUser)

module.exports = routes