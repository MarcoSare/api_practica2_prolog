const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
    first_name: {type: String, require: true},
    last_name: {type: String, require: true},
    gender: {type: String, require: true},
    telephone: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    type: {type: String, require: true},
    id_area: {type: mongoose.Types.ObjectId, ref:"area"},
}, {'collection':'user'})

const user = mongoose.model('user', user_schema);
module.exports = user