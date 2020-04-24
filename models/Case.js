const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        default: 'no image'
    },
    imageUrl: {
        type: String,
        default: '/images/no-case.jpg'
    },
    public_id: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: String,
        required: true
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

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;