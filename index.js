require("dotenv").config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const appServer = require('./bin/app/server') 

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.json())
app.use(appServer)

app.listen(process.env.APP_PORT, () => { 
    console.log('It Works! '+ process.env.APP_PORT);
});
