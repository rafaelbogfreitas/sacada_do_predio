const User = require('../../models/User');

let registerControllers = {
    //POST /register
    registerPost: (req, res, next) => {
        let {
            user
        } = req.session.passport;

        const {
            state,
            address
        } = req.body;

        if (req.file) {
            console.log('if')
            const {
                originalname,
                url
            } = req.file;
            User
                .findByIdAndUpdate(user, {
                    status: 'registered',
                    state,
                    address,
                    imageName: originalname,
                    imageUrl: url
                })
                .then(response => {
                    console.log('then if')
                    res.redirect('/dashboard');
                })
                .catch(error => console.log(error));
        } else {
            console.log('else')
            User
                .findByIdAndUpdate(user, {
                    status: 'registered',
                    state,
                    address
                })
                .then(response => {
                    console.log('then else')
                    res.redirect('/dashboard');
                })
                .catch(error => console.log(error));
        }
    },

    getRegister: (req, res, next) => {
        res.render('dashboard/new-case');
    }
}

module.exports = registerControllers;