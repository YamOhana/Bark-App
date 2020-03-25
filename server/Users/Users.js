const mongoose = require('mongoose')

const Schema = mongoose.Schema


const userSchema = new Schema({

    name: String,
    age: Number,
    size: String,
    park: Boolean,
    houers: TimeRanges,
    owner: {
        name: String,
        age: Number,
        smoke: Boolean,

    }


})