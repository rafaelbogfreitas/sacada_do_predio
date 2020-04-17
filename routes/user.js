const express = require('express');
const router = express.Router();

const controllers = require('./controllers/userControllers');
const ensureLogin = require("connect-ensure-login");

//Cloudinary config import
const uploadCloud = require('../config/cloudinary.js');

// USER ROUTES

router.get('/user/edit', ensureLogin.ensureLoggedIn('/'), controllers.getEditUser);

router.post('/user/edit', uploadCloud.single('file'), controllers.postEditUser);

router.get('/user/delete', ensureLogin.ensureLoggedIn('/'), controllers.getDeleteUser);

module.exports = router;