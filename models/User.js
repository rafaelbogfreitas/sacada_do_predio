const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
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
        default:''
    },
    imageUrl:{
        type:String,
        default:''
    },
    casesCreated:[],
    donations:[]
})

const User = mongoose.model('User', userSchema);

module.exports = User;