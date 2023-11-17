const authController = require("../../controller/JWTadmin/accUserController")
const middlewareController = require("../../controller/JWTadmin/middlewareController")
const accUserControllerService = require("../../controller/JWTadmin/accUserControllerService")

const routes = require("express").Router()
//register xong
routes.post("/register", authController.registerUser)
//login
routes.post("/login", authController.loginUser)
//refresh
routes.post("/refresh", authController.refreshToken)
//log out - thêm middlewareController vì nếu user phải log in thì mới có thể log out
routes.post("/logout", middlewareController.verifyToken,  authController.logoutUser)
//get user
//GET all user
routes.get("/", middlewareController.verifyToken, accUserControllerService.getAllUser)

module.exports = routes