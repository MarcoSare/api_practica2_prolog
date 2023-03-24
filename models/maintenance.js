const mongoose = require('mongoose')

const maintenance_schema = mongoose.Schema({
    id_area: {type: mongoose.Types.ObjectId, ref:"area"},
    id_computer: {type: mongoose.Types.ObjectId, ref:"computer"},
    date: {type: String, require: true},
    support: {type: mongoose.Types.ObjectId, ref:"user"},
    type: {type: String, require: true},
    is_completed: {type: Boolean},
}, {'collection':'maintenance'})

const maintenance = mongoose.model('maintenance', maintenance_schema);
module.exports = maintenance