const { Train, Room, Ticket } = require('../model/model')

const roomController = {
    //add a room
    addroom: async (req, res) => {
        try {
            const newRoom = new Room(req.body);
            const saveRoom = await newRoom.save();
            if (req.body.train) {
                const train = await Train.findById(req.body.train);
                await train.updateOne({ $push: { rooms: saveRoom._id } });
            }
            res.status(200).json(saveRoom);
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },

    //get all room 
    getAllroom: async (req, res) => {
        try {
            const allRoom = await Room.find()
            res.status(200).json(allRoom)
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },

    //get a room
    getAroom: async (req, res) => {
        try {
            const room = await Room.findById(req.params.id).populate(["ticket","train"])
            res.status(200).json(room)
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },

    //get a room by roomNumber and kind
    getAroomByRoomNumberAndKind: async (req, res) => {
        try {
            const room = await Room.findOne({ roomNumber: req.params.roomNumber, kind: req.params.kind }).populate("ticket")
            if (room) {
                res.status(200).json(room)
            } else {
                res.status(404).json({ message: "Room not found" });
            }
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },

    //Update a room
    updateARoom: async (req, res) => {
        try {
            const room = await Room.findById(req.params.id)
            await room.updateOne({ $set: req.body })
            res.status(200).json("updated successfully")
        } catch (error) {
            res.status(500).jon(error)
        }
    },
    //delete a room
    deleteRoom: async(req,res) =>{
        try {
            await Train.updateMany(
                { rooms: req.params.id },
                { $pull: { rooms: req.params.id } }
            )
            await Ticket.updateMany(
                {rooms:req.params.id},
                {rooms:null}
            )
            await Room.findByIdAndDelete(req.params.id)
            res.status(200).json("Delete successfully")
        } catch (error) {
            res.status(500).jon(error)
        }
    }

}

module.exports = roomController