const mongoose = require('mongoose')


const labTest = {
    testDate: {
        type: Date
    },
    sampleDate: {
        type: Date
    },
    performingFacility: {
        type: String
    },
    referringFacility: {
        type: String
    }
}

const occupationDetail = {
    occupationName: {
        type: String
    },
    employerName: {
        type: String
    },
    placeOfWork: {
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
    typeOfResidence: {
        type: String
    },
    buildingName: {
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
    }

}


const patientAddress = {
    emirate: {
        type: String,
    },
    region: {
        type: String
    },
    zone: {
        type: String
    },
    typeOfResidence: {
        type: String
    },
    buildingName: {
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
    }
}

const schoolData = {
    instituteType: {
        type: String,
    },
    schoolName: {
        type: String,
    },
    classNumber: {
        type: String,
    },
    classSection: {
        type: String,
    },
    // Institute Address
    emirate: {
        type: String,
    },
    region: {
        type: String,
    },
    zone: {
        type: String,
    },
    typeOfResidence: {
        type: String,
    },
    buildingName: {
        type: String,
    },
    flatNumber: {
        type: String,
    },
    area: {
        type: String,
    },
    streetNumber: {
        type: String,
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }

}


const newPatientSchema = new mongoose.Schema({
    fullname: {
        type: String,
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
    vaccination : {
        covidVaccineStatus : {
            type: String
        }
    },
    patientAddress: new mongoose.Schema(patientAddress),
    school: new mongoose.Schema(schoolData),
    labTests: [
        new mongoose.Schema(labTest)
    ],
    occuapation: new mongoose.Schema(occupationDetail)

})

module.exports = mongoose.model('Patient', newPatientSchema)