module.exports = function notFound (schema) {
    schema.post('findOne', function (res, next) {
        if (!res) {
            // return next(new Error('Not found!'))
            return next('Not found!')
            // return res.render('index.hbs')
        }
        return next()
    })
}
  