const {Train,Room} = require('../model/model')

const trainController = {
    //add train
    addTrain: async(req, res) =>{
        try {
            const newTrain = new Train(req.body)
            const saveTrain = await newTrain.save()
            res.status(200).json(saveTrain)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //get all train
    getAllTrain: async(req, res) =>{
        try {
            const train = await Train.find();
            res.status(200).json(train);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //get a train
    getATrain: async(req, res) =>{
        try {
            const train = await Train.findById(req.params.id).populate("rooms")
            res.status(200).json(train)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //update a train
    updateATrain: async(req, res) => {
        try {
            const train = await Train.findById(req.params.id)
            await train.updateOne({$set:req.body})
            res.status(200).json("updated successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //delete a train
    deleteATrain:async(req,res) =>{
        try {
            await Room.updateMany(
                {train:req.params.id},
                {train:null}
            )
            await Train.findByIdAndDelete(req.params.id)
            res.status(200).json("delete successfullly")
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = trainController