const Patient = require('../models/patient')
const { faker } = require('@faker-js/faker');

// function getRandomInRange(from, to, fixed) {
//     return parseFloat((Math.random() * (to - from) + from).toFixed(fixed));
// }


function getLatLong(emirate) {
    if (emirate.toLowerCase() === 'abu dhabi') {
        return { lat: 24.466667, lng: 54.366669 };
    } else if (emirate.toLowerCase() === 'dubai') {
        return { lat: 25.2048, lng: 55.2708 };
    } else if (emirate.toLowerCase() === 'sharjah') {
        return { lat: 25.357119, lng: 55.391068 };
    } else if (emirate.toLowerCase() === 'ajman') {
        return { lat: 25.400073, lng: 55.481698 };
    } else if (emirate.toLowerCase() === 'umm al-quwain') {
        return { lat: 25.520482, lng: 55.713391 };
    } else if (emirate.toLowerCase() === 'fujairah') {
        return { lat: 25.11899, lng: 56.34956 };
    } else if (emirate.toLowerCase() === 'ras al khaimah') {
        return { lat: 25.983932, lng: 56.075012 };
    }
}



function generateRandomPoint(center, radius) {
    console.log("center:", center, "rad:", radius)
    var x0 = center.lng;
    var y0 = center.lat;
    // Convert Radius from meters to degrees.
    var rd = radius / 111300;
    var u = Math.random();
    var v = Math.random();
    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);
    var xp = x / Math.cos(y0);
    // Resulting point.
    console.log({ lat: y + y0, lng: xp + x0 })
    return { lat: y + y0, lng: xp + x0 };
}



// const region = ["ABU DHABI", "AL AIN", "AL DHAFRA"];
const typePlaceResidence = ["Villa", "Flat", "Hotel", "Camp"];
const gender = ['male', 'female'];
const ageMapping = {
    1: '0-14',
    2: '15-19',
    3: '20-24',
    4: '25-29',
}
const nationalityData = ["AFGHANISTAN", "ALAND ISLANDS", "ALBANIA", "ALGERIA"]
const residencyStatusData = ["UAE CITIZEN", "RESIDENT EXPATRIATES", "VISITOR"]
const performingFacility = ["CSKB UOS Hall COVID Vaccination", "CJMZ MUZAIRA", "MEDEOR 24 7 HOSPITAL", "MKU Al Kuwaiti"]
const occupations = ["DRIVING INSTRUCTOR", "Administration", "Airline", "Beauty Salons (Men / Women)"]

const createPatients = (async (req, res) => {
    if (!req.body.noOfCases) {
        res.status(400).send({
            message: "Invalid Data!",
        });
    } else {

        try {
            let results = []
            const numberOfRecords = req.body.noOfCases;
            const emirate = req.body.emirate ? req.body.emirate : 'Dubai';
            const employerEmirate = req.body.occupationDetails?.employerEmirate ?
                req.body.occupationDetails.employerEmirate : 'Dubai';
            const direction = getLatLong(emirate);
            const employerDirection = getLatLong(employerEmirate);
            let vaccineStatus = null;
            if (req.body.patientDemographics?.covidVaccineStatus) {
                if (req.body.patientDemographics.covidVaccineStatus == 'No') {
                    vaccineStatus = false
                } else {
                    vaccineStatus = true
                }
            }
            for (let i = 0; i < numberOfRecords; i++) {

                let patientDirection = generateRandomPoint(direction, 1000);
                let employerCoordinates = generateRandomPoint(employerDirection, 1000);

                results.push({
                    emirate: req.body.patientDemographics?.emirate ? req.body.patientDemographics?.emirate : 'Dubai',
                    // region: req.body.patientDemographics.region ? req.body.patientDemographics.region : region[Math.floor(Math.random() * region.length)],
                    typePlaceResidence: req.body.patientDemographics?.typeOfResidence ?
                        req.body.patientDemographics?.typeOfResidence : typePlaceResidence[Math.floor(Math.random() * typePlaceResidence.length)],
                    buildingNumber: req.body.patientDemographics?.buildingName ?
                        req.body.patientDemographics?.buildingName : faker.address.buildingNumber(),
                    latitude: patientDirection.lat,
                    // getRandomInRange(direction.lat, direction.lng, 3),
                    longitude: patientDirection.lng,
                    gender: req.body.patientDemographics?.gender ? req.body.patientDemographics?.gender : gender[Math.floor(Math.random() * gender.length)],
                    ageGroup: req.body.patientDemographics?.ageGroup ? req.body.patientDemographics?.ageGroup : ageMapping[Math.floor(Math.random() * (4 - 0 + 1) + 0)],
                    dob: req.body.patientDemographics?.dob ? req.body.patientDemographics?.dob : faker.date.past(),
                    nationality: req.body.patientDemographics?.nationality ? req.body.patientDemographics?.nationality :
                        nationalityData[Math.floor(Math.random() * nationalityData.length)],
                    residencyStatus: req.body.patientDemographics?.residencyStatus ? req.body.patientDemographics?.residencyStatus :
                        residencyStatusData[Math.floor(Math.random() * residencyStatusData.length)],
                    vaccinationStatus: vaccineStatus ? vaccineStatus : faker.datatype.boolean(),
                    labTests: {
                        testDate: req.body.labTests?.testDate ? req.body.labTests?.testDate : faker.date.between(),
                        sampleCollectionDate: req.body.labTests?.sampleDate ? req.body.labTests?.sampleDate :
                            faker.date.between(),
                        performingFacility: req.body.labTests?.performingFacility ? req.body.labTests?.performingFacility :
                            performingFacility[Math.floor(Math.random() * performingFacility.length)],
                        referringFacility: req.body.labTests?.referringFacility ? req.body.labTests?.referringFacility :
                            performingFacility[Math.floor(Math.random() * performingFacility.length)],

                    },
                    caseOccupation: {
                        occupation: req.body.occupationDetails?.occupation ? req.body.occupationDetails?.occupation :
                            occupations[Math.floor(Math.random() * occupations.length)],
                        employerEmirate: req.body.occupationDetails?.employerEmirate ?
                            req.body.occupationDetails.employerEmirate : 'Dubai',
                        latitude: employerCoordinates.lat,
                        // getRandomInRange(employerDirection.lat, employerDirection.lng, 3),
                        longitude: employerCoordinates.lng,
                        // getRandomInRange(employerDirection.lat, employerDirection.lng, 3),
                    }
                })

            }
            // console.log('results', results)
            await Patient.insertMany(results)
            res.status(201).json({
                message:
                    "Successfully created data!",
            });

        } catch (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating data.",
            });

        }
    }


})

const getPatients = (async (req, res) => {
    try {
        const patients = await Patient.find({}, { latitude: 1, longitude: 1, _id: 0 })
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
    getPatients
}