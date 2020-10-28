const { AssertionError } = require('assert')
const { MongoError } = require('mongodb')

function errorHandler (error, req, res) {
    console.error('Error', error)
    if (error instanceof AssertionError) {
        return res.status(400).json({
            success: false,
            type: 'AssertionError',
            message: error.message
        })
    } else if (error instanceof MongoError) {
        return res.status(503).json({
            success: false,
            type: 'MongoError',
            message: error.message
        })
    } else if(error.message === 'Not found!'){
        console.log('here')
        res.render('index.hbs')
    } else {
        res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

module.exports = errorHandler
