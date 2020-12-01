const app = require('./app')
// setting port
let port = process.env.PORT || 8000

// establishing server
app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})
