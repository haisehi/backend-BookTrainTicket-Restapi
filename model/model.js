const mongoose = require('mongoose');

//train : xong
const trainSchema = new mongoose.Schema({
    train: {
        type: String,
        require: true,
    },
    countRoom: {
        type: Number,
        require: true,
    },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room"
        }
    ]
})

//room : xong
const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: Number,
        require: true,
    },
    countChair: {
        type: Number,
        require: true,
    },
    kind: {
        type: String,
        require: true,
    },
    nameTrain: {
        type: String,
        require: true,
    },
    // fk cua train
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Train"
    },
    ticket: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket"
        }
    ]
})

// station
const stationSchema = new mongoose.Schema({
    NameStation: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    ticket: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    }]
})

//ticket :xong
const ticketSchema = new mongoose.Schema({
    from: {
        type: String,
        require: true,
    },
    to: {
        type: String,
        require: true,
    },
    departure: {
        type: String,
        require: true,
    },
    return: {
        type: String,
    },
    timeGodeparture: {
        type: String,
        require: true,
    },
    timeTodeparture: {
        type: String,
        require: true,
    },
    timeGoreturn: {
        type: String,
    },
    timeToreturn: {
        type: String,
    },
    ticketType: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    numberChair: {
        type: Number,
        require: true,
    },
    kind: {
        type: String,
        require: true,
    },
    state: {
        type: Boolean,
        require: true,
    },
    img: {
        type: String, // Kiểu dữ liệu là String để lưu trữ đường dẫn tệp ảnh
    },
    //fk cua rooms
    rooms:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    //customer
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },

})

//customer shipping
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    object: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    CMND: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    paymethod: {
        type: String,
        require: true,
    },
    //fk ticket
    ticket: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    }],
    //fk account customer
    accUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AccUser"
    },
})

//account user
const accUserSchema = new mongoose.Schema({
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
    admin: {
        type: Boolean,
        default: false,
    },
    //customer
    customer: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        }
    ],

}, { timestamps: true }
)



let Train = mongoose.model("Train", trainSchema)
let Room = mongoose.model("Room", roomSchema)
let Ticket = mongoose.model("Ticket", ticketSchema)
let Customer = mongoose.model("Customer", customerSchema)
let Station = mongoose.model("Station", stationSchema)
let AccUser = mongoose.model("AccUser", accUserSchema)

module.exports = { Train, Room, Ticket, Customer, Station, AccUser }