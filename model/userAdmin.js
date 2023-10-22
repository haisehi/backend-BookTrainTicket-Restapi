const mongoose = require('mongoose')

const userAdminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    admin:{
        type: Boolean,
        default: false,
    }
},{timestamps:true}
)

module.exports = mongoose.model("UserAdmin",userAdminSchema)