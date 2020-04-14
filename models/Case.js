const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const caseSchema = new Schema({
    title: String,
    description: String,
    image: String,
    user: POPULATE WITH MODEL USER,
    address: String
})

const Case = mongoose.model('Case', caseSchema);
module.exports = Case;