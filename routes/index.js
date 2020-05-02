const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.locals.metaTags = { 
        "twitter:description": "Ajude as pessoas da sua comunidade",   
        "twitter:title": "Ajude as pessoas da sua comunidade",   
        "twitter:image": "https://res.cloudinary.com/dxaul4b4j/image/upload/v1587519926/Sacada%20do%20Pr%C3%A9dio/metatag2_aepuja.png",   
        "og:title":"Ajude pessoas da sua comunidade",
        "og:description":"Descubra as necessidades da sua região",
        "og:url":"http://sacadadopredio.com",
        "og:image":"https://res.cloudinary.com/dxaul4b4j/image/upload/v1587519926/Sacada%20do%20Pr%C3%A9dio/metatag2_aepuja.png",
    }; 
    res.render('index', req.flash());
});

router.get('/about', (req, res, next) => {
    res.render('about', req.flash());
});

module.exports = router;