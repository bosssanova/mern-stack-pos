const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = mongoose.model('users')

let ProductlogSchema = new Schema({
    seqNo: { type: Number },
    user: [{
        id: { type: Schema.Types.ObjectId, ref: 'User' },
        name: { type: String }
    }],
    docNo: { type: String },
    createAt: { type: Date, default: Date.now },
    productEditList: [{
        id: { type: Schema.Types.ObjectId, ref: 'Product' },
        name: { type: String },
        oldStock: { type: Number },
        changeStock: { type: Number, required: true },
        unit: { type: String }
    }],
}
    , {
        versionKey: false
    }
    // , { timestamps: true, versionKey: false }
)

// Export the model
module.exports = mongoose.model('Productlog', ProductlogSchema);
