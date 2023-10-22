const userAdmin = require("../model/userAdmin")
const bcrypt = require('bcrypt')

const authController = {
    //register
    registerUser: async(req,res) =>{
        try {
            //hash password
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password , salt)

            //tạo một user mới
            const newUser = await new userAdmin({
                userName: req.body.userName,
                email: req.body.email,
                password:hashed,
            });
            //lưu vào database
            const UserAdmin = await newUser.save();
            res.status(200).json(UserAdmin) 
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //Login
    loginUser: async (req, res) => {
        try {
            const user = await userAdmin.findOne({ userName: req.body.userName });
            if (!user) {
                return res.status(404).json("Wrong username");
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(404).json("Password is wrong");
            }
            if (user && validPassword) {
                return res.status(200).json(user);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
}

module.exports=authController