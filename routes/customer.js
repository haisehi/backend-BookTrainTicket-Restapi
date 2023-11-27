const customerController = require('../controller/customerController')

const router = require('express').Router()

//Add customer
router.post("/",customerController.addCustomert)

//get all customer
router.get("/",customerController.getAllCustomer)

//get a customer
router.get("/:id",customerController.getACustomer)

// Get a customer by accUser ID
router.get('/by-accuser/:accUserId', customerController.getAllCustomersByAccUser);

router.get('/by-idCard/:CMND', customerController.getShippingByIDCard);

//update a customer
router.put("/:id",customerController.updateACustomer)

//delete a customer
router.delete("/:id",customerController.deleteCustomer)

module.exports = router