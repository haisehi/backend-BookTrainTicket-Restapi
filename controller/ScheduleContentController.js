const { ScheduleContent } = require('../model/model')

const ScheduleContentController = {
    addContent: async (req, res) => {
        try {
            const newContent = new ScheduleContent(req.body)
            const saveContent = await newContent.save()
            res.status(200).json(saveContent)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllContnet: async (req, res) => {
        try {
            const content = await ScheduleContent.find();
            res.status(200).json(content);
        } catch (error) {
            res.status(500).json(error)
        }
    },
}

module.exports = ScheduleContentController
