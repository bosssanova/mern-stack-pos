const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SaleSchema = new Schema({
    // required: true
    saleList: [{
        id: { type: Schema.Types.ObjectId, ref: 'Product' },
        name: { type: String },
        oldStock: { type: Number },
        changeStock: { type: Number, required: true },
        unit: { type: String }
    }],
    name: { type: String },
    category: { type: String },
    price: { type: Number },
    stock: { type: Number },
    amount: { type: String },
}, { timestamps: true, versionKey: false })

// Export the model
module.exports = mongoose.model('Sale', SaleSchema);
