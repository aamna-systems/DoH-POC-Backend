const express = require('express')
var cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const url = 'mongodb+srv://taliha:bscs0102@cluster0.rbkfqer.mongodb.net/pos'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})



app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// const patientRouter = require('./routes/patient')
// app.use('/patient', patientRouter)

const patientRouter = require('./routes/newPatient')
app.use('/patient', patientRouter)


app.listen(5000, () => {
    console.log('Server started')
})