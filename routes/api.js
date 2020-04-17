require('dotenv').config();
const axios = require('axios');
const express = require('express');
const router = express.Router();

const controllers = require('./controllers/apiControllers');


router.get('/api/users', controllers.userApi);
router.get('/api/cases', controllers.casesApi);
router.get('/api/geocode', (req, res, send) => {
    let userAddress = 'Rua jose ovidio do vale 1914'
    let apiKey = process.env.GOOGLE_API_KEY
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}&key=${process.env.GOOGLE_API_KEY}`
    axios
        .get(url)
        .then(response => res.send(response.data.results[0].geometry.location))
        .catch(error => console.log(error))
})

module.exports = router;