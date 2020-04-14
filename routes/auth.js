const express = require('express');
const router = express.Router();

//controllers import
const controllers = require('./controllers/authControllers');

//Cloudinary config import
const uploadCloud = require('../config/cloudinary.js');


router.post('/signup', uploadCloud.single('file'), controllers.signupPost);

module.exports = router;