const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const infoSchema = new mongoose.Schema({
    photo:{
        type:String,
        default:"no photo"
    },
    petName:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    user:{
        type:ObjectId,
        ref:"USER"
    }
})

mongoose.model("INFO", infoSchema)