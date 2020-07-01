const Controller = require('./controller')
const controller = new Controller()

module.exports = {  
    filterDataInput: async (req, res) => {
        const {data} = req.query
        const getData = async () => controller.controllerFilterData(data)
        const sendRespon = async (result) => {
            if(!result){
                return res.status(500).json({
                    massage: "ERROR"
                })
            }else{
                return res.status(200).json({
                    data: result
                })
            }
        }
        sendRespon(await getData())
    },

    getDataYouTube: async (req, res) => {
        const {data} = req.query
        const getData = async () => controller.constrollerGetDataYT(data)
        const sendRespon = async (result) => {
            if(!result){
                return res.status(500).json({
                    massage: "ERROR"
                })
            }else{
                return res.status(200).json({
                    data: result
                })
            }
        }
        sendRespon(await getData())
    }
}