const { faker } = require('@faker-js/faker');
const newPatient = require('../models/newPatient');
const nodemailer = require("nodemailer");
const { json } = require('body-parser');
const region = ["Bur Dubai", "Deira", "Jumeirah"];
const typePlaceResidence = ["Villa", "Apartment", "Hotel"];
const gender = ['male', 'female'];
const ageMapping = {
    1: '0-14',
    2: '15-19',
    3: '20-24',
    4: '25-29',
}
const nationalityData = ['UAE', 'India', 'Pakistan', 'Egypt']
const residencyStatusData = ["UAE CITIZEN", "RESIDENT EXPATRIATES", "VISITOR"]
const performingFacility = ["CSKB UOS Hall COVID Vaccination", "CJMZ MUZAIRA", "MEDEOR 24 7 HOSPITAL", "MKU Al Kuwaiti"]
const occupations = ["Procurement officer", " IT Manager", " HR Manager", "Doctor"]

//ned to update building name of patiend address
const patientAddressBuildingMapping = {
    "Hotel Tulip": { lat: 25.2554478, lng: 55.2984144 },
    "Al Khoory Hotel Apartments": { lat: 25.1126745, lng: 55.1928349 },
    "Saffron Hotel": { lat: 25.2613126, lng: 55.3256735 },
    "Garden Homes Frond O": { lat: 25.10778577, lng: 55.12997274 },
}

//har coded data
const patientAddressBuildings = ["Hotel Tulip", "Al Khoory Hotel Apartments", "Saffron Hotel", "Garden Homes Frond O"]
const flatsNumber = ["701", "505", "103", "A-15"]
const area = ["Bur Dubai", "Deira", "Jumeirah", "Palm Jumeirah"]
const streetNumbers = ["3A Street", "1 Al Barsha 1 Street", "34c Street", "Al Safawi - Frond O Street", "Wadi Al Safa 6 Street"]



const schoolInsitute = ["Nursery", "School", "University"]
const schoolsName = ["The Westminster School", "International Academic School", "Nord Anglia International School",
    "Gems Metropole School"]
const schoolCoordinates = {
    "The Westminster School": { lat: 25.2828471, lng: 55.37083 },
    "International Academic School": { lat: 25.1863, lng: 55.4034 },
    "Nord Anglia International School": { lat: 25.0618708, lng: 55.2266874 },
    "Gems Metropole School": { lat: 25.0333053, lng: 55.2815025 },
}
const zonesMapping = {
    "Bur Dubai": "Zone 5",
    "Deira": "Zone 6",
    "Jumeirah": "Zone 2",
}
const employersName = ["Dubai Health Authority", "Microsoft", "Techvista Systems"]
const placesOfWork = ["Al Kifaf building", "Microsoft Dubai office Building", "The Exchange Tower Building", "Latifa Tower Building"]
const occupationArea = ["Zabeel", "Dubai Knowledge Park", "Business Bay", "World Trade Centre"]
const placeOfWorkCoordinates = {
    "Al Kifaf building": { lat: 25.2311037, lng: 55.29137 },
    "Microsoft Dubai office Building": { lat: 25.0948373, lng: 55.1625756 },
    "The Exchange Tower Building": { lat: 25.0742823, lng: 55.1885387 },
    "Latifa Tower Building": { lat: 25.2216793, lng: 55.2810159 }
}
const covidVaccineStatus = ['Yes', 'No']

function getRandomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}


function patientEntry(requestBody) {

    let patientAddressRegion = getRandomValue(region);
    let schoolAddressRegion = getRandomValue(region);
    let occupationRegion = getRandomValue(region);
    const patientData = {
        fullname: faker.name.fullName(),
        gender: getRandomValue(gender),
        ageGroup: ageMapping[Math.floor(Math.random() * (4 - 0 + 1) + 0)],
        dob: faker.date.past(),
        nationality: getRandomValue(nationalityData),
        residencyStatus: getRandomValue(residencyStatusData),
        patientAddress: {
            emirate: "Dubai",
            region: patientAddressRegion,
            zone: zonesMapping[patientAddressRegion],
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
            classNumber: Math.floor(Math.random() * (4 - 1 + 1) + 1),
            classSection: String.fromCharCode(65 + Math.floor(Math.random() * 4)),
            // Institute Address
            emirate: "Dubai",
            region: schoolAddressRegion,
            zone: zonesMapping[schoolAddressRegion],
            latitude: null,
            longitude: null
        },
        occuapation: {
            occupationName: getRandomValue(occupations),
            employerName: getRandomValue(employersName),
            placeOfWork: null,
            // Employer Address
            emirate: "Dubai",
            region: occupationRegion,
            zone: zonesMapping[occupationRegion],
            area: getRandomValue(occupationArea),
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
            if (value !== null) {
                let newValue = typeof value == "string" ? value : getRandomValue(value)
                patientData[key] = newValue
            }

        }
    }
    if (requestBody?.vaccination) {
        for (let [key, value] of Object.entries(requestBody.vaccination)) {
            if (value != null) {
                let newValue = typeof value == "string" ? value : getRandomValue(value)
                patientData.vaccination[key] = newValue
            }

        }
    }
    if (requestBody?.labTests) {
        for (let [key, value] of Object.entries(requestBody.labTests)) {
            if (value != null) {
                let newValue = typeof value == "string" ? value : getRandomValue(value)
                patientData.labTests[key] = newValue
            }

        }
    }

    if (requestBody?.patientAddress) {
        for (let [key, value] of Object.entries(requestBody.patientAddress)) {
            if (value != null) {
                let newValue = typeof value == "string" ? value : getRandomValue(value)
                patientData.patientAddress[key] = newValue;
                if (key == 'buildingName') {
                    patientData.patientAddress.latitude = patientAddressBuildingMapping[newValue].lat
                    patientData.patientAddress.longitude = patientAddressBuildingMapping[newValue].lng
                }
            } else {
                if (key == 'buildingName') {
                    let buildingName = getRandomValue(patientAddressBuildings)
                    patientData.patientAddress.buildingName = buildingName;
                    console.log(buildingName, patientAddressBuildingMapping[buildingName].lat)
                    patientData.patientAddress.latitude = patientAddressBuildingMapping[buildingName].lat
                    patientData.patientAddress.longitude = patientAddressBuildingMapping[buildingName].lng
                }
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
            if (value != null) {
                let newValue = typeof value == "string" ? value : getRandomValue(value)
                patientData.school[key] = newValue;
                if (key == 'schoolName') {
                    patientData.school.latitude = schoolCoordinates[newValue].lat
                    patientData.school.longitude = schoolCoordinates[newValue].lng
                }
            } else {
                if (key == 'schoolName') {
                    let schoolName = getRandomValue(schoolsName)
                    patientData.school.schoolName = schoolName;
                    patientData.school.latitude = schoolCoordinates[schoolName].lat
                    patientData.school.longitude = schoolCoordinates[schoolName].lng
                }
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
            if (value != null) {
                let newValue = typeof value == "string" ? value : getRandomValue(value)
                patientData.occuapation[key] = newValue;
                if (key == 'placeOfWork') {
                    patientData.occuapation.placeOfWork = newValue
                    patientData.occuapation.latitude = placeOfWorkCoordinates[newValue].lat
                    patientData.occuapation.longitude = placeOfWorkCoordinates[newValue].lng
                }
            } else {
                if (key == 'placeOfWork') {
                    let placeOfWork = getRandomValue(placesOfWork)
                    patientData.occuapation.placeOfWork = placeOfWork;
                    patientData.occuapation.latitude = placeOfWorkCoordinates[placeOfWork].lat
                    patientData.occuapation.longitude = placeOfWorkCoordinates[placeOfWork].lng
                }
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


const getEmailQuery = (() => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'wilfredo.auer@ethereal.email',
            pass: 'fK7eP8XJjjmcFrh8vt'
        },
    });


    var d = new Date();
    d.setMinutes(d.getMinutes() - 2);

    schoolsName.map(async (element) => {
        let results = await newPatient.aggregate([
            {
                $match: {
                    "school.schoolName": element,
                    createdAt: {
                        $gte: d
                    }
                }

            },
            {
                $group: {
                    _id: {
                        key: "$school.classNumber",
                        value: "$school.classSection"
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $group: {
                    _id: "$_id.key",
                    Sections: {
                        $push: {
                            value: "$$ROOT._id.value",
                            count: "$$ROOT.count"
                        }
                    }
                }
            },

        ])


        var Table = "<table><tr><th>Class Name</th><th>Section</th><th>Patients</th></tr><tr>";
        let flag = false

        results.forEach((value, i) => {
            value.Sections.forEach((v, i) => {
                if (v.count > 2) {
                    flag = true
                    Table += `<TD>${value._id}</TD>`;
                    Table += `<TD>${v.value}</TD>`;
                    Table += `<TD>${v.count}</TD>`;
                    Table += "</tr><tr> ";
                }
            })
            // var a = i + 1;
            // if (a != results.length) {
            //     Table += "</tr><tr> ";
            // }
        });
        Table += "</tr></table>";

        console.log("tab", element, Table)


        if (flag) {
            transporter.sendMail({
                from: '"Fred Foo 👻" hoyt.auer53@ethereal.email', // sender address
                to: "jewino2698@keshitv.com", // list of receivers
                subject: element, // Subject line
                text: "Hi, Check the stats.", // plain text body
                html: Table, // html body
            }, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }

                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        }
    });
})
const sendWorkPlaceEmails = (() => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'wilfredo.auer@ethereal.email',
            pass: 'fK7eP8XJjjmcFrh8vt'
        },
    });


    var d = new Date();
    d.setMinutes(d.getMinutes() - 2);

    placesOfWork.map(async (element) => {
        let results = await newPatient.aggregate([
            {
                $match: {
                    "occuapation.placeOfWork": element,
                    createdAt: {
                        $gte: d
                    }
                }
            },
            {
                $group: {
                    _id: "$occuapation.placeOfWork",
                    count: {
                        $sum: 1
                    }
                }
            },
        ])

        console.log('results', JSON.stringify(results))

        var Table = "<table><tr><th>Place of Work</th><th>Patients</th></tr><tr>";
        let flag = false

        results.forEach((value, i) => {
            if (value.count > 2) {
                flag = true
                Table += `<TD>${value._id}</TD>`;
                Table += `<TD>${value.count}</TD>`;
                Table += "</tr><tr> ";
            }
            // var a = i + 1;
            // if (a != results.length) {
            //     Table += "</tr><tr> ";
            // }
        });
        Table += "</tr></table>";

        console.log("tab", element, Table)


        if (flag) {
            transporter.sendMail({
                from: '"Fred Foo 👻" hoyt.auer53@ethereal.email', // sender address
                to: "jewino2698@keshitv.com", // list of receivers
                subject: element, // Subject line
                text: "Hi, Check the stats.", // plain text body
                html: Table, // html body
            }, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }

                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        }
    });
})



exports.patientEntry = patientEntry
exports.getEmailQuery = getEmailQuery
exports.sendWorkPlaceEmails = sendWorkPlaceEmails
