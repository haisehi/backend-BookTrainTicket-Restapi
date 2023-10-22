const authController = require("../../controller/JWTadmin/authController")
const middlewareController = require("../../controller/JWTadmin/middlewareController")

const routes = require("express").Router()
//register
routes.post("/register", authController.registerUser)
//login
routes.post("/login", authController.loginUser)
//refresh
routes.post("/refresh", authController.refreshToken)
//log out - thêm middlewareController vì nếu user phải log in thì mới có thể log out
routes.post("/logout", middlewareController.verifyToken,  authController.logoutUser)
module.exports = routes