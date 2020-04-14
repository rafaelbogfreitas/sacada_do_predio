const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({
  dest: './public/uploads/'
});
const uploadCloud = require('../config/cloudinary.js');

router.get('/', (req, res, next) => {
    res.render('index');
})

router.post('/test', uploadCloud.single('file'),(req, res, next) => {
    console.log(req.file)

    // console.log(req.body.file)
    res.send(req.file);
})

module.exports = router;