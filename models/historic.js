const mongoose = require('mongoose')

const historic_schema = mongoose.Schema({
    id_area: {type: mongoose.Types.ObjectId, ref:"area"},
    id_computer: {type: mongoose.Types.ObjectId, ref:"computer"},
    date: {type: String, require: true},
    support: {type: mongoose.Types.ObjectId, ref:"user"},
}, {'collection':'historic'})

const historic = mongoose.model('historic', historic_schema);
module.exports = historic