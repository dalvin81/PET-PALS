const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    userName: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    photo:{
        type:String,
    },
    petName:{
        type:String
    },
    about:{
        type:String
    }

})

mongoose.model("USER", userSchema)