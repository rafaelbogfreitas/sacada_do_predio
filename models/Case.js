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
        default: 'no image'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: String,
        required: true
    }
});

const Case = mongoose.model('Case', caseSchema);
module.exports = Case;