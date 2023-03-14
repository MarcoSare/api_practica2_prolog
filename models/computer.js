const mongoose = require('mongoose')

const computer_schema = mongoose.Schema({
    serail_number : {type: String, require: true, unique: true},
    brand: {type: String, require: true},
    model: {type: String, require: true},
    processor: {type: String, require: true},
    ram: {type: String, require: true},
    storage: {type: String, require: true},
    prev_main : {type: Boolean, require: true}, // Preventive Maintenance
    corr_main: {type: Boolean, require: true}, // Corrective maintenance
    id_user: {type: mongoose.Types.ObjectId, ref:"user"},
}, {'collection':'computer'})

const computer = mongoose.model('computer', computer_schema);
module.exports = computer