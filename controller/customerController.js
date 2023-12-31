const { Ticket, Customer, AccUser } = require('../model/model')

const customerController = {
    //add ticket
    addCustomert: async (req, res) => {
        try {
            const newCustomer = new Customer(req.body);
            const saveCustomer = await newCustomer.save();
            if (req.body.ticket) {
                const ticket = await Ticket.findById(req.body.ticket);
                await ticket.updateOne({ $push: { customer: saveCustomer._id } });
            }
            if (req.body.accUser) {
                const accUser = await AccUser.findById(req.body.accUser);
                await accUser.updateOne({ $push: { customer: saveCustomer._id } });
            }
            res.status(200).json(saveCustomer);
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
            console.log(err);
        }
    },
    //get all ticket
    getAllCustomer: async (req, res) => {
        try {
            const allCustomer = await Customer.find()
            res.status(200).json(allCustomer)
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },
    //get a ticket
    getACustomer: async (req, res) => {
        try {
            const customer = await Customer.findById(req.params.id).populate("ticket")
            res.status(200).json(customer)
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },

    //get all tickets by accUserId
    getAllCustomersByAccUser: async (req, res) => {
        const { accUserId } = req.params;

        try {
            // Find all customers with the given accUser ID
            const customers = await Customer.find({ accUser: accUserId }).populate('ticket');

            if (!customers || customers.length === 0) {
                return res.status(404).json({ message: 'Customers not found for the provided accUser ID' });
            }

            res.status(200).json(customers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    //get a information about the customer by ID card number
    getShippingByIDCard: async (req, res) => {
        const { CMND } = req.params;
        try {
            // Find all customers with the given CMND
            const customers = await Customer.find({ CMND }).populate('ticket');
            if (!customers || customers.length === 0) {
                return res.status(404).json({ message: 'Customers not found for the provided CMND' });
            }
            res.status(200).json(customers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    
    //update a ticket
    updateACustomer: async (req, res) => {
        try {
            const customer = await Customer.findById(req.params.id)
            await customer.updateOne({ $set: req.body })
            res.status(200).json("updated successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //delete a ticket
    deleteCustomer: async (req, res) => {
        try {
            await Ticket.updateMany(
                { customer: req.params.id },
                { customer: "" }
            ),
                await AccUser.updateMany(
                    { customer: req.params.id },
                    { $pull: { customer: req.params.id } }
                )
            await Customer.findByIdAndDelete(req.params.id)
            res.status(200).json("Delete successfully")
        } catch (error) {
            console.log(error)
            res.status(500).jon(error)
        }
    }

}

module.exports = customerController