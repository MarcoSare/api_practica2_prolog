const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
    first_name: {type: String, require: true},
    last_name: {type: String, require: true},
    gender: {type: String, require: true},
    telephone: {type: String, require: true},
    email: {type: String, require: true},
}, {'collection':'user'})

const user = mongoose.model('user', user_schema);
module.exports = user