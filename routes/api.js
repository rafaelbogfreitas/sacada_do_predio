const express = require('express');
const router = express.Router();

const controllers = require('./controllers/apiControllers');


router.get('/api/users', controllers.userApi);

module.exports = router;