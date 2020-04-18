const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        // required: true,
        // unique: true
    },
    password: {
        type: String,
        // required: true
    },
    googleID: String,
    email: {
        type: String,
        // required: true
    },
    status: {
        type: String,
        enum: ['registered', 'waiting'],
        default: 'waiting',
    },
    address: {
        type: String,
        default: 'missing address'
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
        },
        coordinates: {
            type: [Number]
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;