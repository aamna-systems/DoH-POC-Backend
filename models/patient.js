const mongoose = require('mongoose')


const labTest = {
    testDate: {
        type: Date
    },
    sampleCollectionDate: {
        type: Date
    },
    performingFacility: {
        type: String
    },
    referringFacility: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }
}

const occupationDetail = {
    occupation: {
        type: String
    },
    sponsorName: {
        type: String
    },
    workPlace: {
        type: String
    },
    employerEmirate: {
        type: String,
        default: 'dubai'
    },
    region: {
        type: String
    },
    zone: {
        type: String
    },
    eduInsituteType: {
        type: String
    },
    collegeName: {
        type: String
    },
    schoolAddress: {
        type: String
    },
    classNumber: {
        type: String
    },
    classSection: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }

}

const patientSchema = new mongoose.Schema({
    emirate: {
        type: String,
        default: 'dubai'
    },
    region: {
        type: String
    },
    zone: {
        type: String
    },
    typePlaceResidence: {
        type: String
    },
    buildingNumber: {
        type: String
    },
    flatNumber: {
        type: String
    },
    area: {
        type: String
    },
    streetNumber: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    gender: {
        type: String
    },
    ageGroup: {
        type: String
    },
    dob: {
        type: Date
    },
    nationality: {
        type: String
    },
    residencyStatus: {
        type: String
    },
    vaccinationStatus: {
        type: Boolean
    },
    labTests: [
        new mongoose.Schema(labTest)
    ],
    caseOccupation: new mongoose.Schema(occupationDetail)

})

module.exports = mongoose.model('Patient', patientSchema)