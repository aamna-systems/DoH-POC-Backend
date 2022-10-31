const Patient = require('../models/newPatient')
const { faker } = require('@faker-js/faker');

const region = ["ABU DHABI", "AL AIN", "AL DHAFRA"];
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
//ned to update building name of patiend address
const patientAddressBuildingMapping = {
    '1': { lat: 25.2828471, lng: 55.37083 },
    '2': { lat: 25.1863, lng: 55.4034 },
    '3': { lat: 25.0333053, lng: 55.2815025 },
    '4': { lat: 25.1783421, lng: 55.3064431 },
}

//har coded data
const patientAddressBuildings = ['1', '2', '3', '4']
const flatsNumber = ['1', '2']
const area = ['area1', 'area2']
const streetNumbers = ['st1', 'st2']



const schoolInsitute = ["Nursery", "School", "University"]
const schoolsName = ["The Westminster School", "International Academic School", "Nord Anglia International School",
    "Gems Metropole School", "North London Collegiate School"]
const schoolCoordinates = {
    "The Westminster School": { lat: 25.2828471, lng: 55.37083 },
    "International Academic School": { lat: 25.1863, lng: 55.4034 },
    "Nord Anglia International School": { lat: 25.0618708, lng: 55.2266874 },
    "Gems Metropole School": { lat: 25.0333053, lng: 55.2815025 },
    "North London Collegiate School": { lat: 25.1783421, lng: 55.3064431 }
}
const zones = ["zone 1", "zone 2", "zone 3", "zone 4", "zone 5", "zone 6", "zone 7"]
const schoolArea = ["Al Qusais", "Al Warqa", "Al Barsha South", "DAMAC Hills"]
const employersName = ["Etisalat", "Microsoft", "TechVista ltd", "TechManindra ltd", "ManPower ltd"]
const placesOfWork = ["Al Kifaf building", "Microsoft Dubai office Building", "The Exchange Tower Building", "Latifa Tower Building"
    , "InterContinental Dubai Marina, an IHG Hotel Building"]
const occupationArea = ["Zabeel", "Dubai Knowledge Park", "Business Bay", "World Trade Centre", "Dubai Marina"]
const placeOfWorkCoordinates = {
    "Al Kifaf building": { lat: 25.2311037, lng: 55.29137 },
    "Microsoft Dubai office Building": { lat: 25.0948373, lng: 55.1625756 },
    "The Exchange Tower Building": { lat: 25.0742823, lng: 55.1885387 },
    "Latifa Tower Building": { lat: 25.2216793, lng: 55.2810159 },
    "InterContinental Dubai Marina, an IHG Hotel Building": { lat: 25.0791028, lng: 55.1380668 }
}
const covidVaccineStatus = ['Yes', 'No']

function getRandomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}



// function setKeyValue(keyObject, operation = null, patientData) {
//     console.log('keyob', keyObject, operation, patientData)
//     for (let [key, value] of Object.entries(keyObject)) {
//         let newValue = typeof value == "string" ? value : getRandomValue(value)
//         operation ? patientData[operation].key = newValue : patientData[key] = newValue
//     }
// }
function patientEntry(requestBody) {

    let patientData = {
        fullname: faker.name.fullName(),
        gender: getRandomValue(gender),
        ageGroup: ageMapping[Math.floor(Math.random() * (4 - 0 + 1) + 0)],
        dob: faker.date.past(),
        nationality: getRandomValue(nationalityData),
        residencyStatus: getRandomValue(residencyStatusData),
        patientAddress: {
            emirate: "Dubai",
            region: getRandomValue(region),
            zone: getRandomValue(zones),
            typeOfResidence: getRandomValue(typePlaceResidence),
            buildingName: null,
            flatNumber: getRandomValue(flatsNumber),
            area: getRandomValue(area),
            streetNumber: getRandomValue(streetNumbers),
            latitude: null,
            longitude: null
        },
        school: {
            instituteType: getRandomValue(schoolInsitute),
            schoolName: null,
            classNumber: "someDataAsPerDataType",
            classSection: "someDataAsPerDataType",
            // Institute Address
            emirate: "Dubai",
            region: getRandomValue(region),
            zone: getRandomValue(zones),
            typeOfResidence: "someDataAsPerDataType",
            buildingName: "someDataAsPerDataType",
            flatNumber: "someDataAsPerDataType",
            area: getRandomValue(schoolArea),
            streetNumber: "someDataAsPerDataType",
            latitude: null,
            longitude: null
        },
        occuapation: {
            occupationName: getRandomValue(occupations),
            employerName: getRandomValue(employersName),
            placeOfWork: null,
            // Employer Address
            emirate: "Dubai",
            region: getRandomValue(region),
            zone: getRandomValue(zones),
            typeOfResidence: getRandomValue(typePlaceResidence),
            buildingName: "someDataAsPerDataType",
            flatNumber: "someDataAsPerDataType",
            area: getRandomValue(occupationArea),
            streetNumber: "someDataAsPerDataType",
            latitude: null,
            longitude: null
        },
        vaccination: {
            covidVaccineStatus: getRandomValue(covidVaccineStatus),
        },
        labTests: {
            testDate: faker.date.between(),
            sampleDate: faker.date.between(),
            performingFacility: getRandomValue(performingFacility),
            referringFacility: getRandomValue(performingFacility),
        },
    }
    
    if (requestBody?.patientDemographics) {
        for (let [key, value] of Object.entries(requestBody.patientDemographics)) {
            let newValue = typeof value == "string" ? value : getRandomValue(value)
            patientData[key]= newValue
        }
    }
    if (requestBody?.vaccination) {
        for (let [key, value] of Object.entries(requestBody.vaccination)) {
            let newValue = typeof value == "string" ? value : getRandomValue(value)
            patientData.vaccination[key]= newValue
        }
    }
    if (requestBody?.labTests) {
        for (let [key, value] of Object.entries(requestBody.labTests)) {
            let newValue = typeof value == "string" ? value : getRandomValue(value)
            patientData.labTests[key]= newValue
        }
    }

    if (requestBody?.patientAddress) {
        for (let [key, value] of Object.entries(requestBody.patientAddress)) {
            let newValue = typeof value == "string" ? value : getRandomValue(value)
            patientData.patientAddress[key] = newValue;
            if (key == 'buildingName') {
                patientData.patientAddress.latitude = patientAddressBuildingMapping[newValue].lat
                patientData.patientAddress.longitude = patientAddressBuildingMapping[newValue].lng
            }
        }
    } else {
        let buildingName = getRandomValue(patientAddressBuildings)
        patientData.patientAddress.buildingName = buildingName;
        console.log(buildingName, patientAddressBuildingMapping[buildingName].lat)
        patientData.patientAddress.latitude = patientAddressBuildingMapping[buildingName].lat
        patientData.patientAddress.longitude = patientAddressBuildingMapping[buildingName].lng
    }

    if (requestBody?.school) {
        for (let [key, value] of Object.entries(requestBody.school)) {
            let newValue = typeof value == "string" ? value : getRandomValue(value)
            patientData.school[key] = newValue;
            if (key == 'schoolName') {
                patientData.school.latitude = schoolCoordinates[newValue].lat
                patientData.school.longitude = schoolCoordinates[newValue].lng
            }
        }
    } else {
        let schoolName = getRandomValue(schoolsName)
        patientData.school.schoolName = schoolName;
        patientData.school.latitude = schoolCoordinates[schoolName].lat
        patientData.school.longitude = schoolCoordinates[schoolName].lng
    }

    if (requestBody?.occuapation) {
        for (let [key, value] of Object.entries(requestBody.occuapation)) {
            let newValue = typeof value == "string" ? value : getRandomValue(value)
            patientData.occuapation[key] = newValue;
            if (key == 'placeOfWork') {
                patientData.occuapation.latitude = placeOfWorkCoordinates[newValue].lat
                patientData.occuapation.longitude = placeOfWorkCoordinates[newValue].lng
            }
        }
    } else {
        let placeOfWork = getRandomValue(placesOfWork)
        patientData.occuapation.placeOfWork = placeOfWork;
        patientData.occuapation.latitude = placeOfWorkCoordinates[placeOfWork].lat
        patientData.occuapation.longitude = placeOfWorkCoordinates[placeOfWork].lng
    }

    return patientData

}




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
            console.log('results', results)
            await Patient.insertMany(results)
            res.status(201).json({
                message:
                    "Successfully created data!",
            });
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
        const patients = await Patient.find({}, { patientAddress: { latitude: 1, longitude: 1}, _id: 0 })
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