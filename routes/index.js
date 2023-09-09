const express = require('express')
const routes = express.Router()
const { getCountries, saveCountry, getCountriesDb, deleteCountryDb, findByIdDb, modifyCountry } = require('../resource/country')

routes.get('/', async (req, res) => {

    try {
        const data = await getCountries()
        // console.log(data);
        res.render('index.ejs', {
            title: 'Inicio',
            data: data
        })
    } catch {
        res.render('index.ejs', {
            title: 'Error'
        })
    }
})

routes.post('/saved', async (req, res) => {
    try {
        const country = {
            nameCommon: req.body.nameCommon,
            nameOfficial: req.body.nameOfficial,
            independent: JSON.parse(req.body.independent),
            capital: req.body.capital,
            region: req.body.region,
            coatOfArms: req.body.coatOfArms,
            flags: req.body.flags,
            alt: req.body.alt
        }
       // console.log(country)
        saveCountry(country)
        res.redirect('/')
    } catch {
        res.render('Error.ejs', {
            title: 'Error'
        })
    }
})

routes.get('/savedCountries', async (req, res) => {
    try {
        const data = await getCountriesDb()
        //   console.log(data);
        res.render('savedCountries.ejs', {
            title: 'save Country',
            data: data
        })
    } catch {
        res.render('index.ejs', {
            title: 'Error'
        })
    }
})

routes.post('/deleteCountry', async (req, res) => {
    try {
        const _id = req.body._id
        const data = await deleteCountryDb(_id)
        // console.log(data.data);
        res.redirect('/savedCountries')
    } catch {
        res.render('index.ejs', {
            title: 'Error'
        })
    }
})
routes.post('/modCountry', async (req, res) => {
    try {
        const _id = req.body.id
        //console.log(_id)
        const data = await findByIdDb(_id)
        //console.log(data)
        res.render('editCountry.ejs', {
            title: "Edit Country",
            data: data.findByIdDb
        })
    } catch (error) {
        console.log(error);
    }
})

routes.post('/modifyCountry', async (req, res) => {
    try {
        const countryData = req.body
        //console.log(countryData);
        const response = await modifyCountry(countryData)
       // console.log(response);
        res.redirect('/savedCountries')
    } catch (error) {
        console.log(error);
    }
    
})


module.exports = routes
