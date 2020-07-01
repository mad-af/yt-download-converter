const Service = require('./services')
const service = new Service()

class Controller {
    async controllerFilterData(data) {
        const Data = async () => {       
            if (!data) return 'Ilegal'
            return service.serviceFIlterData(data, (err, result) => {
                if(err) throw err
                return result
            })
        }
        const result = await Data()
        return result
    }

    async constrollerGetDataYT(data) {
        const Data = async () => {
            if (!data) return 'Ilegal'
            return service.serviceGetDataYT(data, (err, result) => {
                if(err) throw err
                return result
            })
        }
        const result = await Data()
        return result
    }
}

module.exports = Controller