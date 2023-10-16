const ticketController = require('../controller/ticketController')


const router = require('express').Router()

//Add ticket
router.post("/",ticketController.addticket)

//get all ticket
router.get("/",ticketController.getAllTicket)

//get a ticket
router.get("/:id",ticketController.getATicket)

//get a ticket by 
router.get("/:from/:to",ticketController.getRoomByFromandTo)

//update a ticket
router.put("/:id",ticketController.updateAticket)

//delete a ticket
router.delete("/:id",ticketController.deleteticket)

module.exports = router