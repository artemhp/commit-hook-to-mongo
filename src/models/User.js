var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    login: String
})

module.exports = mongoose.model('User', userSchema)
