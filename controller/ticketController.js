const { Room , Ticket, Customer } = require('../model/model')

const ticketController ={
    //add ticket
    addticket:async(req,res)=>{
        try {
            const newTicket = new Ticket(req.body);
            const saveTicket = await newTicket.save();
            if (req.body.rooms) {
                const rooms = await Room.findById(req.body.rooms);
                await rooms.updateOne({ $push: { ticket: saveTicket._id } });
            }
            res.status(200).json(saveTicket);
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    //get all ticket
    getAllTicket:async(req,res)=>{
        try {
            const allTicket = await Ticket.find()
            res.status(200).json(allTicket)
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },
    //get a ticket
    getATicket:async(req,res)=>{
        try {
            const ticket = await Ticket.findById(req.params.id).populate(["rooms","customer"])
            res.status(200).json(ticket)
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },
    //get a room by from to time
    getRoomByFromandTo:async(req,res)=>{
        try {
            const ticket = await Ticket.findOne({ from: req.params.from, to: req.params.to }).populate("rooms")
            if (ticket) {
                res.status(200).json(ticket)
            } else {
                res.status(404).json({ message: "Ticket not found" });
            }
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },
    //update a ticket
    updateAticket:async(req,res)=>{
        try {
            const ticket = await Ticket.findById(req.params.id)
            await ticket.updateOne({ $set: req.body })
            res.status(200).json("updated successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //delete a ticket
    deleteticket:async(req,res) => {
        try {
            await Room.updateMany(
                { ticket: req.params.id },
                { $pull: { ticket: req.params.id } }
            )
            await Customer.updateMany(
                { ticket: req.params.id },
                { $pull: { ticket: req.params.id } }
            )
            await Ticket.findByIdAndDelete(req.params.id)
            res.status(200).json("Delete successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = ticketController