const mongoose = require('mongoose')
const { nanoid } = require('nanoid')
const URLSchema = new mongoose.Schema(
    {
        origin:{
            type: String,
            required: true
        },
        short:{
            type: String,
            unique: true,
            default: () => nanoid()
        },
        email:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        collection: 'urls',
    }
)


URLSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/
    return emailRegex.test(email) // Assuming email has a text attribute
}, 'The e-mail field cannot be empty.')

module.exports = mongoose.model('URL', URLSchema)
