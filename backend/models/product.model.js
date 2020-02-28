const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    // required: true
    name: { type: String },
    barcode: { type: String },
    category: { type: String },
    cost: { type: Number },
    price: { type: Number },
    stock: { type: Number },
    unit: { type: String },
    fileName: {
        type: String,
        default: "none"
    },
    imageData: {
        type: String
    }
}, { timestamps: true, versionKey: false })

// Export the model
module.exports = mongoose.model('Product', ProductSchema);
