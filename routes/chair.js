const chairController = require('../controller/chairController')

const router = require('express').Router()

//Add chair
router.post("/",chairController.addchair)

//get all chair
router.get("/",chairController.getAllchair)

//get a chair
router.get("/:id",chairController.getAchair)

//update a chair
router.put("/:id",chairController.updateAChair)

//delete a chair
router.delete("/:id",chairController.deleteAChair)

module.exports = router