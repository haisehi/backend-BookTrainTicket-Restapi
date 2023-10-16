const roomController = require('../controller/roomController')


const router = require('express').Router()

//Add room
router.post("/",roomController.addroom)

//get all room
router.get("/",roomController.getAllroom)

//get a room
router.get("/:id",roomController.getAroom)

//get a room by roomNumber and kind
router.get("/:roomNumber/:kind",roomController.getAroomByRoomNumberAndKind)

//update a room
router.put("/:id",roomController.updateARoom)

//delete a room
router.delete("/:id",roomController.deleteRoom)

module.exports = router