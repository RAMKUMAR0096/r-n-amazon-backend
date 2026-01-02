const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "GENERAL"
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        default: undefined
    },
    addresses: {
        type: [{
            name: String,
            mobileNo: String,
            houseNo: String,
            street: String,
            landmark: String,
            city: String,
            country: String,
            postalCode: String
        }],
        default: []
    },
    orders: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Order'
        }],
        default: []
    }
}, {
    timestamps: true
})

const User = mongoose.model("User",userSchema);

module.exports = User;