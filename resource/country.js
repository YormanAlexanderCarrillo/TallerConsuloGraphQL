const axios = require('axios');

//const Url = 'http://localhost:4005/';
const Url = 'https://graphqlbackend.fly.dev/'

async function getCountries() {
    try {
        const response = await axios.post(Url, {
            query: "{obtainAll{nameCommon,nameOfficial,independent,capital,region,coatOfArms, flags, alt}}"
            //  query: "{obtainAll{nameCommon,nameOfficial,coatOfArms, flags, alt}}"
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

        //console.log(response.data.data)
        return response.data.data.obtainAll
    } catch (error) {
        // console.log(error);
    }
}

async function saveCountry(country) {
    try {
        const response = await axios.post(
            Url,
            {
                query: `
                mutation($nameCommon: String!, $nameOfficial: String!, $independent: Boolean!, $capital: String!, $region: String!, $coatOfArms: String!, $flags: String!, $alt: String!){
                    addCountry(nameCommon: $nameCommon, nameOfficial: $nameOfficial, independent: $independent, capital: $capital, region: $region, coatOfArms: $coatOfArms, flags: $flags, alt: $alt) {
                        nameCommon
                        nameOfficial
                        independent
                        capital
                        region
                        coatOfArms
                        flags
                        alt
                    }
                }
                    `,
                variables: {
                    nameCommon: country.nameCommon,
                    nameOfficial: country.nameOfficial,
                    independent: country.independent,
                    capital: country.capital,
                    region: country.region,
                    coatOfArms: country.coatOfArms,
                    flags: country.flags,
                    alt: country.alt
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            }
        );
        // console.log(response.data);
        //console.log(country);
    } catch (error) {
        console.error(error);
    }
}

async function getCountriesDb() {
    try {
        const response = await axios.post(Url, {
            query: "{obtainAllDb{_id nameCommon,nameOfficial, flags, alt, coatOfArms}}"
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

        //console.log(response.data.data)
        return response.data.data.obtainAllDb
    } catch (error) {
        console.log(error);
    }
}

async function deleteCountryDb(_id) {
    try {
        const response = await axios.post(Url, {
            query: `
            mutation($deleteCountryId: String!){
                deleteCountry(id: $deleteCountryId) {
                nameCommon
                }
            }
            `, variables: {
                "deleteCountryId": _id
            }
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        }
        )
        return response
    } catch (error) {
        console.log(error)
    }
}

async function findByIdDb(_id) {
    try {
        const response = await axios.post(Url, {
            query: `
            query ($findByIdDbId: String!) {
                findByIdDb(id: $findByIdDbId) {
                _id
                nameCommon
                nameOfficial
                capital
                region
                independent
                coatOfArms
                flags
                alt
                }
            }
            `, variables: {
                "findByIdDbId": _id
            }
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        }
        )
        // console.log(response.data.data)
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}

async function modifyCountry(country) {
    try {
        //console.log(JSON.parse(country.inputIndependent));
        const response = await axios.post(Url, {
            query: `
            mutation($modifyCountryId: String!, $nameCommon: String!, $nameOfficial: String!, $independent: Boolean!, $capital: String!, $region: String!, $coatOfArms: String!, $flags: String!, $alt: String!) {
                modifyCountry(id: $modifyCountryId, nameCommon: $nameCommon, nameOfficial: $nameOfficial, independent: $independent, capital: $capital, region: $region, coatOfArms: $coatOfArms, flags: $flags, alt: $alt) {
                    nameCommon
                }
            }
            `,
            variables: {
                "modifyCountryId": country.id,
                "nameCommon": country.inputNameCommon,
                "nameOfficial": country.inputNameOfficial,
                "independent": JSON.parse(country.inputIndependent),
                "capital": country.inputCapital,
                "region": country.inputRegion,
                "coatOfArms": country.inputCoatOfArms,
                "flags": country.inputFlags,
                "alt": country.inputDescription
            }
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        console.log(response.data.data.modifyCountry);
        return response
    } catch (error) {
        console.log(error);
    }

}


module.exports.getCountries = getCountries
module.exports.saveCountry = saveCountry
module.exports.getCountriesDb = getCountriesDb
module.exports.deleteCountryDb = deleteCountryDb
module.exports.findByIdDb = findByIdDb
module.exports.modifyCountry= modifyCountry