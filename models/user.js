const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
})
//things like username and passwords are hidden here
UserSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model('User', UserSchema)