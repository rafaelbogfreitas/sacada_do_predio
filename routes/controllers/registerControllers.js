const User = require('../../models/User');

let registerControllers = {
    //POST /register
    registerPost: (req, res, next) => {
        const {
            id,
            state,
            address
        } = req.body;
        
        // const {
        //     originalname,
        //     url
        // } = req.file;
        
        User.findByIdAndUpdate(id, {
            status: 'registered',
            state,
            address,
            // imageName: originalname,
            // imageUrl: url
        })
        .then(response => {
            res.send('/register');
        })
        .catch(error => console.log(error));
                
           
        
    }
}

module.exports = registerControllers;