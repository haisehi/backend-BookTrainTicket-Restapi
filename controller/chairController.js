const { Chair, Room, Ticket } = require('../model/model')

const chairController = {
    //add a chair
    addchair: async (req, res) => {
        try {
            const newChair = new Chair(req.body);
            const saveChair = await newChair.save();
            if (req.body.rooms) {
                const rooms = await Room.findById(req.body.rooms);
                await rooms.updateOne({ $push: { chairs: saveChair._id } });
            }
            res.status(200).json(saveChair);
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    //get all chair
    getAllchair: async (req, res) => {
        try {
            const chair = await Chair.find();
            res.status(200).json(chair);
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },
    //get a chair
    getAchair: async (req, res) => {
        try {
            const chair = await Chair.findById(req.params.id).populate("rooms")
            res.status(200).json(chair)
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },
    //update a chair
    updateAChair: async (req, res) => {
        try {
            const chair = await Chair.findById(req.params.id)
            await chair.updateOne({ $set: req.body })
            res.status(200).json("updated successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //delete a chair
    deleteAChair:async(req,res) => {
        try {
            await Room.updateMany(
                { chairs: req.params.id },
                { $pull: { chairs: req.params.id } }
            )
            await Ticket.updateMany(
                {chairs:req.params.id},
                {chairs:null}
            )
            await Chair.findByIdAndDelete(req.params.id)
            res.status(200).json("Delete successfully")
        } catch (error) {
            res.status(500).jon(error)
        }
    }
}

module.exports = chairController