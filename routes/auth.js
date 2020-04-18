const express = require('express');
const router = express.Router();

const passport = require('passport')

//controllers import
const controllers = require('./controllers/authControllers');

//Cloudinary config import
const uploadCloud = require('../config/cloudinary.js');

// Auth Routes

router.post('/signup', uploadCloud.single('file'), controllers.signupPost);

router.post("/login", controllers.loginPost);

router.get('/logout', controllers.logoutPost);

router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ]
    })
);
router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/dashboard",
        failureRedirect: "/" // here you would redirect to the login page using traditional login approach
    })
);

module.exports = router;