const { patientEntry, getEmailQuery, sendWorkPlaceEmails } = require('../helpers/dataMapHelper');
const Patient = require('../models/newPatient')


const createPatients = (async (req, res) => {
    if (!req.body.noOfCases) {
        res.status(400).send({
            message: "Invalid Data!",
        });
    } else {
        try {
            let results = []
            const numberOfRecords = req.body.noOfCases;
            for (let i = 0; i < numberOfRecords; i++) {
                const entry = patientEntry(req.body)
                results.push(entry)
            }
           // console.log('results', results)
            await Patient.insertMany(results)

            getEmailQuery();
            sendWorkPlaceEmails();

            res.status(201).send({
                message:
                    "Successfully created data!",

            })
            
        } catch (err) {
            console.log(err)
            res.status(500).send(
                err
            );
        }
    }


})

const getPatients = (async (req, res) => {
    try {
        const patients = await Patient.find({}, { patientAddress: { latitude: 1, longitude: 1, buildingName: 1 }, _id: 0 })
        res.status(201).json(patients)
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while fetching.",
        });
    }
})
const getAllFieldsPatients = (async (req, res) => {
    try {
        const patients = await Patient.find({})
        res.status(201).json(patients)
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while fetching.",
        });
    }
})



module.exports = {
    createPatients,
    getPatients,
    getAllFieldsPatients
}