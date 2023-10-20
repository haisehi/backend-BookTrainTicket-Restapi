const StationController = require('../controller/StationController')
const router = require('express').Router()

//Add Station
router.post("/",StationController.addStation)

//get all Station
router.get("/",StationController.getAllStation)

//get a Station
router.get("/:id",StationController.getAStation)

//update a Station
router.put("/:id",StationController.updateAStation)

//delete a Station
router.delete("/:id",StationController.deleteAStation)

module.exports = router