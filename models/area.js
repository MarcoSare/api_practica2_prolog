const mongoose = require('mongoose')

const area_schema = mongoose.Schema({
    name: {type: String, require: true},
}, {'collection':'area'})

const area = mongoose.model('area', area_schema);
module.exports = area