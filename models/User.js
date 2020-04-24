const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    googleID: String,
    email: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ['registered', 'waiting'],
        default: 'waiting'
    },
    address: {
        type: String
    },
    imageName: {
        type: String,
        default: 'avatar'
    },
    imageUrl: {
        type: String,
        default: '/images/avatar.png'
    },
    public_id: {
        type: String
    },
    casesCreated: [{
        type: Schema.Types.ObjectId,
        ref: 'Case'
    }],
    donations: [{
        type: Schema.Types.ObjectId,
        ref: 'Case'
    }],
    phoneNumber: {
        type: String,
        default: ''
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: undefined
        },
        coordinates: {
            type: [Number],
            default: undefined
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;