const express = require('express')
const router = express.Router()

const {
    createPatients,
    getPatients,
} = require('../controllers/newPatient.js')


router.get('/', getPatients)
router.post('/', createPatients)



module.exports = router