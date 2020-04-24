const User = require('../../models/User');


let registerControllers = {
    //POST /register
    registerPost: (req, res, next) => {
        let {
            user
        } = req.session.passport;

        let {
            address,
            phoneNumber,
            lat,
            lng
        } = req.body;

        const location = {
            type: 'Point',
            coordinates: [+lng, +lat]
        }

        let userToRegister = {
            status: 'registered',
            address,
            phoneNumber,
            location: location
        }

        if (req.file) {
            const {
                originalname,
                url,
                public_id
            } = req.file;

            userToRegister = {
                status: 'registered',
                address,
                phoneNumber,
                imageName: originalname,
                imageUrl: url,
                public_id: public_id,
                location: location
            }
        }
        User
            .findByIdAndUpdate(user, userToRegister)
            .then(() => {
                res.redirect('/dashboard');
            })
            .catch(error => console.log(error));

    },

    getRegister: (req, res, next) => {
        res.render('dashboard/new-case');
    }
}

module.exports = registerControllers;