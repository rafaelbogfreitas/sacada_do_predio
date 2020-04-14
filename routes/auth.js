const express = require('express');
const router = express.Router();

//controllers import
const controllers = require('./controllers/authControllers');

//Cloudinary config import
const uploadCloud = require('../config/cloudinary.js');

// Auth Routes

router.post('/signup', uploadCloud.single('file'), controllers.signupPost);

router.post("/login", controllers.loginPost);

router.get('/logout', controllers.logoutPost);

module.exports = router;