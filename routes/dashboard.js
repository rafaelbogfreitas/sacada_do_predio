const express = require('express');
const router = express.Router();

const controllers = require('./controllers/dashboardControllers');
const ensureLogin = require("connect-ensure-login");

//Cloudinary config import
const uploadCloud = require('../config/cloudinary.js');


router.get('/dashboard', controllers.getDashboard);

router.post('/dashboard/new-case', uploadCloud.single('file'), controllers.postNewCase);

router.get('/dashboard/new-case', ensureLogin.ensureLoggedIn('/'), controllers.getNewCase);

router.get('/case/delete/:id', controllers.getDeleteCase);

// router.get('/case/edit/:id', controllers.getEditCase);

// router.post('/case/edit/:id', controllers.postEditCase);

router.get('/case/:id', controllers.getCaseById);



module.exports = router;