// ====================================================================================================================


const path = require('path')
const express = require('express')

const hbs = require('hbs')
const request = require('postman-request')


const forecastResult = require('./utils')

const cors=require('cors')



const application = express()
application.use(cors({
    origin:true
}))
application.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}); 
// =====================================================================================================================

console.log(__dirname); //route to src (in which app.js is)
console.log(__filename); // route to app.js

console.log(path.join(__dirname, '../public/index.html'));

// =====================================================================================================================


// handlebars: to create dynamic templates
// there's some code/ part of webpage that is common to all pages, create one file for that
// to work with handlebars in express, we need to install npm module: hbs
// npm i hbs
// now, further steps:

// set up handlebars

application.set('view engine', 'hbs')
// by default searches the views directory in src directory
// now create views directory in the src  directory
// in there, we put all our handlebar views

// if we want to customise the views directory and want to name it something else, ex, template
// then do the following :

const viewPath = path.join(__dirname, '/template/views')
application.set('views', viewPath)

// =====================================================================================================================

// setup static directory to serve
application.use(express.static(path.join(__dirname, '../public')))

// =====================================================================================================================

// creating the partials
const partialPath = path.join(__dirname, '/template/partials')
hbs.registerPartials(partialPath)

// =====================================================================================================================
// with above no need of these below

// //define urls (just like in flask)

// // home page
// application.get('',(req,res)=>{
//     // res.send("<h1>hey there!! welcome!</h1>")
//     // res.send('../public/index.html') // doesn't work in node

// })

// //help page
// application.get('/help',(req,res)=>{
//     res.send('this is help page')
// })

// //use nodemon app.js to present restarting server again and again in the case of node

// // about page
// application.get('/about',(req,res)=>{
//     res.send('<h1>ABOUT PAGE</h1>')
// })

// ========================================================================================================================
// working with hbs now

application.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Saanvi Bhagat',
        age: 20
    })
})

//weather page
application.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Saanvi Bhagat'
    })
})


application.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'How can i help you',
        name: 'Saanvi Bhagat'

    })
})


application.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({err: 'enter a location'})
    }
    forecastResult.geocode(req.query.address, (err, { longitude, latitude } = {}) => {
        if (err) {
            return res.send({err})
        }
        else {
            console.log(longitude, latitude);
            forecastResult.forecast(latitude,longitude,(err,data)=>{
                if(err)return res.send({err})
                else {
                    res.send({
                        location: data.name+', '+data.region+', '+data.country,
                        temperature: data.temp,
                        forecast:data.desc,
                        feelslike: data.feelslike
                    })
                }
            })
        }
    })
    
})


//sample
application.get('/json_res', (req, res) => {

    if (!req.query.search) {
        return res.send('error!! provide  a search term')
    }
    console.log(req.query.search);
    res.send([{
        name: 'saanvi',
        age: 20
    },
    {
        name: 'julie',
        age: 27
    }
    ])
})

//to be more specific
application.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404 page',
        message: 'Help article not found',
        name: 'Saanvi Bhagat'
    })
})


// setting up 404 page
application.get('*', (req, res) => {
    res.render('404page', {
        title: '404 page',
        name: 'Saanvi Bhagat',
        message: 'this page does not exist'
    })
})

// ======================================================================================================================

// to start the server -> provide port no. 

application.listen(3000, () => {
    console.log('server is up!!'); // useful info for developer 
})

// =============================================================================================================================