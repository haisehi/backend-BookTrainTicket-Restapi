const express = require('express');
const ticketController = require('../controller/ticketController')
const upload = require('../controller/upload');

const router = require('express').Router()
//Add ticket
router.post("/",ticketController.addticket,)
//get all ticket
router.get("/",ticketController.getAllTicket)
//get a ticket
router.get("/:id",ticketController.getATicket)
//get a ticket by 
router.get("/:from/:to/:departure/:return",ticketController.getRoomByFromandTo)

// Định nghĩa API endpoint để tải lên ảnh
router.post('/upload-image', upload.single('img'), ticketController.uploadImage);


//update a ticket
router.put("/:id",ticketController.updateAticket)

//delete a ticket
router.delete("/:id",ticketController.deleteticket)

module.exports = router