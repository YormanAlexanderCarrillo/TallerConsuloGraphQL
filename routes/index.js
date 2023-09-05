const express = require('express')
const routes = express.Router()
const { getCountries, saveCountry, getCountriesDb , deleteCountryDb} = require('../resource/country')

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
            independent: false,
            capital:"String",
            region: "String",
            coatOfArms: "String",
            flags: req.body.flags,
            alt: req.body.alt
        }
        //console.log(country)
        saveCountry(country)
        res.redirect('/')
    } catch {
        res.render('Error.ejs', {
            title: 'Error'
        })
    }
})

routes.get('/savedCountries',async (req, res)=>{
    try {
        const data = await getCountriesDb()
        console.log(data);
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

routes.get('/deleteCountry',async (req, res)=>{
    try {
        const _id = req.body._id
        const data = await deleteCountryDb(_id)
        console.log(data);
        res.redirect('/savedCountries')
    } catch {
        res.render('index.ejs', {
            title: 'Error'
        })
    }
})



module.exports = routes
