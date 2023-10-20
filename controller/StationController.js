const {Station,Ticket} = require('../model/model')

const StationController = {
//add train
addStation: async(req, res) =>{
    try {
        const newStation = new Station(req.body)
        const saveStation = await newStation.save()
        res.status(200).json(saveStation)
    } catch (error) {
        res.status(500).json(error)
    }
},
//get all train
getAllStation: async(req, res) =>{
    try {
        const station = await Station.find();
        res.status(200).json(station);
    } catch (error) {
        res.status(500).json(error)
    }
},
//get a train
getAStation: async(req, res) =>{
    try {
        const station = await Station.findById(req.params.id).populate("ticket")
        res.status(200).json(station)
    } catch (error) {
        res.status(500).json(error)
    }
},
//update a train
updateAStation: async(req, res) => {
    try {
        const station = await Station.findById(req.params.id)
        await station.updateOne({$set:req.body})
        res.status(200).json("updated successfully")
    } catch (error) {
        res.status(500).json(error)
    }
},
//delete a train
deleteAStation:async(req,res) =>{
    try {
        await Ticket.updateMany(
            {station:req.params.id},
            {station:null}
        )
        await Station.findByIdAndDelete(req.params.id)
        res.status(200).json("delete successfullly")
    } catch (error) {
        res.status(500).json(error);
    }
}
}

module.exports = StationController