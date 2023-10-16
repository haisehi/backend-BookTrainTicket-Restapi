const mongoose = require('mongoose');

/*
    1 tàu có nhiều khoan
    1 khoan có nhiều ghế
    1 ghế có nhiều vé (khác ngày)
    1 giỏ hàng có 1 hoặc nhiều vé
    0 hoặc nhiều khách hàng có 1 giỏ hàng
*/

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
    // fk cua train
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Train"
    },
    chairs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chair"
        }
    ]
})

//Chair : xong
const chairSchema = new mongoose.Schema({
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
    // fk cua room
    rooms:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
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
    //fk cua chair
    chairs:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chair"
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    }
    // cart
    // cart: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Cart"
    // }
})

//cart
// const cartSchema = new mongoose.Schema({
//     countPrice: {
//         type: Number,
//         require: true,
//     },
//     paymethod: {
//         type: String,
//         require: true,
//     },
//     //fk cua ticket
//     ticket: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Ticket"
//         }
//     ],
//     //fk cua customer
//     customer: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Customer"
//     }

// })

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
    ticket: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    }]
    // cart
    // cart: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Cart"
    // }
})



let Train = mongoose.model("Train", trainSchema)
let Room = mongoose.model("Room", roomSchema)
let Chair = mongoose.model("Chair", chairSchema)
let Ticket = mongoose.model("Ticket", ticketSchema)
// let Cart = mongoose.model("Cart", cartSchema)
let Customer = mongoose.model("Customer", customerSchema)

module.exports = { Train, Room, Chair, Ticket, Customer }