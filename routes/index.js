const express = require('express');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

router.get('/', (req, res, next) => {
    res.render('index');
})

router.get('/dashboard', ensureLogin.ensureLoggedIn('/'), (req, res) => {
    res.render('dashboard');
})

module.exports = router;