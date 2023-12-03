const { AccUser, Customer } = require("../../model/model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { token } = require("morgan")

let refreshTokens = []

const authController = {
    //register xong
    registerUser: async (req, res) => {
        try {
            //hash password
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            //tạo một user mới
            const newUser = await new AccUser({
                userName: req.body.userName,
                email: req.body.email,
                password: hashed,
            });
            //lưu vào database
            const SaveAccUser = await newUser.save();
            if (req.body.customer) {
                const customer = await Customer.findById(req.body.customer);
                await customer.updateOne({ $push: { accUser: SaveAccUser._id } });
            }

            res.status(200).json(SaveAccUser)
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    //Generate access token
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "30d" }
        );
    },
    //Generate refresh token
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
            process.env.JWT_REFRESH_TOKEN,
            { expiresIn: "365d" }
        );
    },

    //Login
    loginUser: async (req, res) => {
        try {
            const user = await AccUser.findOne({ userName: req.body.userName });
            if (!user) {
                return res.status(404).json("Wrong username");
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(404).json("Password is wrong");
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user)
                const refreshToken = authController.generateRefreshToken(user)
                //lưu trữ refresh token vào mảng
                refreshTokens.push(refreshToken);
                //lưu refreshtoken trong cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })

                const { password, ...others } = user._doc;
                return res.status(200).json({ ...others, accessToken });
            }
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },
    //dùng redis để lưu refresh token
    /*
        mỗi khi người dùng đăng nhập sẽ tạo ra một access token mới có hạn là 20s,
        nếu hết hạn thì người dừng sẽ không thể req lại các res mong muốn,
        khi access token được tạo ra sẽ tạo ra một refresh token có hạn là 360d,
        khi thực hiện /refresh với refresh token thì người dùng có thể tạo ra access token mới để sử dụng và refresh token mới 
    */
    refreshToken: async (req, res) => {
        //take refresh token from user
        const refreshToken = req.cookies.refreshToken
        // res.status(200).json(refreshToken);
        if (!refreshToken) return res.status(401).json("You are not authenticated");
        if (!refreshTokens.includes(refreshToken)) { //kiểm tra refreshToken có ở trong refreshTokens không
            return res.status(403).json("refresh token is not valid")
        }
        //xác nhận xem refresh token có đúng hay không
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken) //lọc token cũ ra nếu có token mới
            //create new access token and refresh token
            const newAccessToken = authController.generateAccessToken(user)
            const newRefreshToken = authController.generateRefreshToken(user)
            refreshTokens.push(newRefreshToken)
            //lưu refreshtoken trong cookie
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({ accessToken: newAccessToken })
        })
    },
    //logout user
    logoutUser: async (req, res) => {
        //làm refresh token biến mất đi
        res.clearCookie("refreshToken")
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
        res.status(200).json("successfull log out",)
    }
}

//store token
//1) local storage - client - dễ bị tấn công bởi xss 
//2) cookies - dễ bị tấn công bởi csrf -> samesite - cookie an toàn là HTTPONLY COOKIE
//3) redux store -> lưu accesstoken
//HTTPONLY COOKIE -> lưu trữ Refreshtoken

module.exports = authController