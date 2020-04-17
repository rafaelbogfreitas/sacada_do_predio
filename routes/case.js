const express = require('express');
const router = express.Router();

const controllers = require('./controllers/caseControllers');

//Cloudinary config import
const uploadCloud = require('../config/cloudinary.js');

// CASE ROUTES

router.get('/case/delete/:id', controllers.getDeleteCase);

router.get('/case/edit/:id', controllers.getEditCase);

router.post('/case/edit/:id', uploadCloud.single('file'), controllers.postEditCase);

router.get('/case/:id', controllers.getCaseById);

module.exports = router;