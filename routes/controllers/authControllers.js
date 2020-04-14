//bcrypt
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

//User model
const User = require("../../models/User");

let authControllers = {
    signupPost: (req, res, next) => {
        
        console.log(req.file);

        const {
            name,
            password,
            email,
            state,
            address
        } = req.body;
    
        const {
            originalname,
            url
        } = req.file;
    
        let salt = bcrypt.genSaltSync(bcryptSalt);
        let hash = bcrypt.hashSync(password, salt);
    
        User.find({username: name})
            .then( response => {
                console.log(response)
                if(response.length == 0){
                    User.create({
                        username: name,
                        email,
                        password: hash,
                        state,
                        address,
                        imageName: originalname,
                        imageUrl: url
                    })
                    .then( response => console.log('New user created'))
                    .catch( error => console.log(error));
                }
            })
            .catch( error => console.log(error))
    
        res.send(req.body);
    }
}

module.exports = authControllers;