const mongoose = require('mongoose')

const writesScheme = new mongoose.Schema({
    name : String,
    title : String,
    content : String,
    type: String,
})

const writesModel = mongoose.model("writes",writesScheme)
module.exports = writesModel