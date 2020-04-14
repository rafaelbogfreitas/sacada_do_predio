const express = require('express');
const router = express.Router();

//bcrypt
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

//Multer import and config
const multer = require('multer');
const upload = multer({
  dest: './public/uploads/'
});

//Cloudinary config import
const uploadCloud = require('../config/cloudinary.js');

router.post('/signup', uploadCloud.single('file'),(req, res, next) => {

    const {
        name,
        password,
        email,
        state,
        address
    } = req.body;

    const {
        original_filename,
        url
    } = req.file;

    let salt = bcrypt.genSaltSync(bcryptSalt);
    let hash = bcrypt.hashSync(password, salt);

    User.find({username: name})
        .then( response => {
            console.log(response)
            if(response.length == 0){
                User.create({
                    username: name,
                    email,
                    password: hash,
                    state,
                    address,
                    imageName: original_filename,
                    imageUrl: url
                })
                .then( response => console.log('New user created'))
                .catch( error => console.log(error));
            }
        })
        .catch( error => console.log(error))

    res.send(req.body);
});

module.exports = router;