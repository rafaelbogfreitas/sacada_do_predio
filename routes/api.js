const express = require('express');
const router = express.Router();

const controllers = require('./controllers/apiControllers');


router.get('/api/users', controllers.userApi);
router.get('/api/cases', controllers.casesApi);

module.exports = router;