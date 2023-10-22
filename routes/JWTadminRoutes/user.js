const middlewareController = require("../../controller/JWTadmin/middlewareController")
const userController = require("../../controller/JWTadmin/userController")

const routes = require("express").Router()

//GET all user
routes.get("/", middlewareController.verifyToken, userController.getAllUser)

//delete user
routes.delete("/:id",middlewareController.verifyTokenAndAdminAuth, userController.deleteUser)

module.exports = routes