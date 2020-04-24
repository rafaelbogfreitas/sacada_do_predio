const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.render('index', req.flash());
});

router.get('/about', (req, res, next) => {
    res.render('about', req.flash());
});

module.exports = router;