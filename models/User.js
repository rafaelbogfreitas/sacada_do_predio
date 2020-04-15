const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [ 'registered', 'waiting'],
        default: 'waiting',
    },
    state: {
        type: String,
        default: 'missing state'
    },
    address:{
        type:String,
        default: 'missing address'
    },
    imageName:{
        type:String,
        default:'avatar'
    },
    imageUrl:{
        type:String,
        default:'/images/avatar.png'
    },
    casesCreated:[],

    donations:[]
})

const User = mongoose.model('User', userSchema);

module.exports = User;