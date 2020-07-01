const server = require('express').Router()
const apiHandler = require('../modules/user/apiHandler')
const Appliance = require('../modules/user/appliance')
const appliance = new Appliance()

server.get('/data', apiHandler.getDataYouTube)
server.get('/filter', apiHandler.filterDataInput)
server.get('/download', appliance.getFileYouTube)

module.exports = server