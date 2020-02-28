const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ImageSchema = new Schema({
    fileName: {
        type: String,
        default: "none"
    },
    imageData: {
        type: String
    }
})

module.exports = mongoose.model("Image", ImageSchema)