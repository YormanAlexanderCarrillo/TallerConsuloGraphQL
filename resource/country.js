const axios = require('axios');

const Url = 'http://localhost:4005/';

async function getCountries() {
    try {
        const response = await axios.post(Url, {
            query: "{obtainAll{nameCommon,nameOfficial,independent,capital,region,coatOfArms, flags, alt}}"
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



module.exports.getCountries = getCountries
module.exports.saveCountry = saveCountry
module.exports.getCountriesDb = getCountriesDb
module.exports.deleteCountryDb = deleteCountryDb