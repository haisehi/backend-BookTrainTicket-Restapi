const ScheduleContentController = require('../controller/ScheduleContentController');


const router = require('express').Router()

//Add room
router.post("/", ScheduleContentController.addContent)
//get all room
router.get("/", ScheduleContentController.getAllContnet)


module.exports = router