const express = require('express')
const BodyParser = require('body-parser')
const cors = require('cors')
const hbs = require('express-handlebars')
const helmet  = require('helmet')
// const Handlebars = require('handlebars')
const morgan = require('morgan')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/ErrorHandler')
require('dotenv').config()

// importing routes
const mainRouter = require('./routes/main')
const viewRouter = require('./routes/view')

// setting up mongoose database
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

// middleware
app.use(morgan('dev'))

// using helmet
app.use(helmet())

// declaring handlebars
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname + '/views/layouts/', partialsDir: __dirname+'/views/partials/'}))
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

app.use(cors())
app.use(BodyParser.json())

// setting static folder to "public"
app.use(express.static( __dirname + '/public'))

// including routes
app.use('/api/', mainRouter)

// view route
app.use('/', viewRouter)

// Error handler middleware
app.use(errorHandler)

module.exports = app