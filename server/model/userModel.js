const mongoose = require('mongoose')

const userNameScheme = new mongoose.Schema({
    name : String,
    email : {type: String,unique:true},
    password : String,
})

const usersModel = mongoose.model("users",userNameScheme)
module.exports = usersModel