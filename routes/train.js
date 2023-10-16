const trainController = require('../controller/trainController')

const router = require('express').Router()

//Add Train
router.post("/",trainController.addTrain)

//get all train
router.get("/",trainController.getAllTrain)

//get a train
router.get("/:id",trainController.getATrain)

//update a train
router.put("/:id",trainController.updateATrain)

//delete a train
router.delete("/:id",trainController.deleteATrain)

module.exports = router