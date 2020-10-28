const express = require('express')
const BodyParser = require('body-parser')
const cors = require('cors')
const hbs = require('express-handlebars')
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

// logger for incoming requests
const logger = morgan('dev', {
    // skip: function (req, res) { return res.statusCode < 400 }
})

const app = express()

// middleware
app.use(logger)

// declaring handlebars
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname + '/views/layouts/', partialsDir: __dirname+'/views/partials/'}))
app.set('view engine', 'hbs')

app.use(cors())
app.use(BodyParser.json())

// setting static folder to "public"
app.use(express.static('public'))

// including routes
app.use('/api/', mainRouter)

// view route
app.use('/', viewRouter)

// Error handler middleware
app.use(errorHandler)

// setting port
let port = process.env.PORT || 8000

// establishing server
app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})
