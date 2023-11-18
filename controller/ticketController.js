const { Room, Ticket, Customer } = require('../model/model')

const ticketController = {
    //add ticket
    addticket: async (req, res) => {
        try {
            const newTicket = new Ticket(req.body);
            const saveTicket = await newTicket.save();
            if (req.body.rooms) {
                const rooms = await Room.findById(req.body.rooms);
                await rooms.updateOne({ $push: { ticket: saveTicket._id } });
            }
            if (req.body.customer) {
                const customer = await Customer.findById(req.body.customer);
                await customer.updateOne({ $push: { ticket: saveTicket._id } });
            }
            res.status(200).json(saveTicket);
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
            console.log(err);
        }
    },
    //get all ticket
    getAllTicket: async (req, res) => {
        try {
            const allTicket = await Ticket.find()
            res.status(200).json(allTicket)
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },
    //get a ticket
    getATicket: async (req, res) => {
        try {
            const ticket = await Ticket.findById(req.params.id).populate(["rooms", "customer"])
            res.status(200).json(ticket)
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },
    //find ticket
    getRoomByFromandTo: async (req, res) => {
        try {
            const ticket = await Ticket.findOne({ from: req.params.from, to: req.params.to, departure: req.params.departure, return: req.params.return }).populate({
                path: 'rooms',
                populate: {
                    path: 'train',
                    model: 'Train',
                    select: 'train'
                }
            });
            if (ticket) {
                const room = ticket.rooms;
                const trainName = room.nameTrain;
                const response = {
                    _id: ticket._id,
                    from: ticket.from,
                    to: ticket.to,
                    departure: ticket.departure,
                    return: ticket.return,
                    timeGodeparture: ticket.timeGodeparture,
                    timeTodeparture: ticket.timeTodeparture,
                    timeGoreturn: ticket.timeGoreturn,
                    timeToreturn: ticket.timeToreturn,
                    ticketType: ticket.ticketType,
                    price: ticket.price,
                    numberChair: ticket.numberChair,
                    kind: ticket.kind,
                    state: ticket.state,
                    rooms: {
                        _id: room._id,
                        roomNumber: room.roomNumber,
                        countChair: room.countChair,
                        kind: room.kind,
                        train: {
                            train: trainName
                        }
                    }
                };
                res.status(200).json(response);
            } else {
                res.status(404).json({ message: "Ticket not found" });
            }
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    },
    //update a ticket
    updateAticket: async (req, res) => {
        try {
            const ticket = await Ticket.findById(req.params.id)
            await ticket.updateOne({ $set: req.body })
            res.status(200).json("updated successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //delete a ticket
    deleteticket: async (req, res) => {
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
    },
    // Thêm hàm xử lý tải lên ảnh
    uploadImage: (req, res) => {
        if (req.file) {
            res.status(200).json({
                message: 'Image uploaded successfully',
                imageUrl: req.file.path
            });
        } else {
            res.status(400).json({ message: 'Image upload failed' });
        }
    },
    // Thêm hàm xử lý cập nhật trạng thái state của vé
    updateTicketState :async (req, res) => {
        try {
            const ticket = await Ticket.findById(req.params.id);
            await ticket.updateOne({ state: req.body.state });

            res.status(200).json({ message: 'Ticket state updated successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating ticket state.' });
        }
    }

}

module.exports = ticketController