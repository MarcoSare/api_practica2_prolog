const mongoose = require('mongoose')

const maintenance_schema = mongoose.Schema({
    id_area: {type: mongoose.Types.ObjectId, ref:"area"},
    id_computer: {type: mongoose.Types.ObjectId, ref:"computer"},
    id_user: {type: mongoose.Types.ObjectId, ref:"user"},
    email: {type: String, require: true},
    date: {type: String, require: true},
    person: {type: String, require: true},
}, {'collection':'maintenance'})

const maintenance = mongoose.model('maintenance', maintenance_schema);
module.exports = maintenance