const express = require('express')
const app = express()
const path = require('path')


app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server to Front Listen Port ${PORT}`))

app.use('/', require('./routes/index.js'))
