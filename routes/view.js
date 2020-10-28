const express = require('express')
const router = express.Router()
const URL = require('../db/models/url')

router.get('/', (req, res) => {
    res.render('index.hbs')
})

router.get('/:short', (req, res, next) => {
    URL.findOne({short: req.params.short}).then((url) => {
        if(!url){
            return res.render('index.hbs')
        }
        res.redirect(url.origin)
    }).catch(next)
})

module.exports = router
