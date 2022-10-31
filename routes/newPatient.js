const express = require('express')
const router = express.Router()

const {
    createPatients,
    getPatients,
    getAllFieldsPatients
} = require('../controllers/newPatient.js')


router.get('/', getPatients)
router.post('/', createPatients)
router.get('/allFields', getAllFieldsPatients)



module.exports = router