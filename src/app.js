const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mapbox = require('./utls/mapbox.js')
const forecast = require('./utls/weatherstack.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// loads root page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ryan Miletello'
    })
})


// about page 
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ryan Miletello'
    })
})


// loads help page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is help.',
        title: 'Help', 
        name: 'Ryan Miletello'
    })
})

// not sure what this if for yet (gets the address from the request and loads the weather)
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    // Old code taken from weather-app
    city = req.query.address
    mapbox(city, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
    
        forecast( latitude, longitude,  (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: city
            })
            // console.log('Forecast for: ' + location)
            // console.log(forecastData)
        })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})



// not found pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ryan Miletello',
        errorMessage: 'Help page not found'  
    })
})

app.get('*', (req, res) => {
     res.render('404', {
         title: '404',
         name: 'Ryan Miletello',
         errorMessage: 'Page not found'
     })
})

// Shows that the srever is runing
app.listen(port, () => {
    console.log('Server is running on port ' + port +'.')
})