const express = require('express')
const router = express.Router()
const URL = require('../db/models/url')
router.get('/', (req, res) => {
    res.json({
        message: 'Hey there 👋🏻'
    })
})

router.get('/:email', (req, res,next) => {
    URL.find({email: req.params.email}).then((urls) => {
        res.send({
            success: true,
            data: urls
        })
    }).catch(next)
})

router.post('/', (req, res,next) => {
    console.log(req.body)
    URL.findOne({short:req.body.short}).then((url) => {
        if(url){
            next(new Error('URL already exists!'))
        } else {
            const newUrl = new URL({
                origin: req.body.origin,
                email: req.body.email
            })
            if(req.body.short !== null){
                newUrl.short = req.body.short
            }
            newUrl.save().then((savedUrl) => {
                res.status(201).send({
                    success:true,
                    data:{
                        savedUrl
                    }
                })
            }).catch(next)
        }
    }).catch(next)
})

router.get('/search', (req, res, next) => {
    URL.find({email: req.query.q}).then((urls) => {
        if(urls.length <1){
            return next(new Error('URLs not found!'))
        }
        return res.send({
            success: true,
            data: urls
        })
    }).catch(next)
})

module.exports = router
