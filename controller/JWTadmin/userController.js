const userAdmin = require('../../model/userAdmin')

const userController = {
    //get all users
    getAllUser: async (req, res) => {
        try {
            const user = await userAdmin.find()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await userAdmin.findById(req.params.id)
            res.status(200).json("Delete successfully")
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = userController