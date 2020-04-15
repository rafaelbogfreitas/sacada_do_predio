const express = require('express');
const router = express.Router();

const controllers = require('./controllers/dashboardControllers');
const ensureLogin = require("connect-ensure-login");


router.get('/dashboard', ensureLogin.ensureLoggedIn('/'), controllers.getDashboard);

// router.get('/dashboard/new-case', ensureLogin.ensureLoggedIn('/'), controllers.getDashboard);

module.exports = router;