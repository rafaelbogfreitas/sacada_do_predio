const User = require('../../models/User');

let registerControllers = {
    //POST /register
    registerPost: (req, res, next) => {
        let {
            user
        } = req.session.passport;

        let {
            state,
            address,
            phoneNumber,
            lat,
            lng
        } = req.body;

        console.log(lng);
        console.log(lat);

        lng = Number(lng);
        lat = Number(lat);

        console.log(lng);
        console.log(lat);

        const coordinates = {
            type: 'Point',
            coordinates: [lng, lat]
          }

        if (req.file) {
            const {
                originalname,
                url,
                public_id
            } = req.file;
            
            User
                .findByIdAndUpdate(user, {
                    status: 'registered',
                    state,
                    address,
                    phoneNumber,
                    imageName: originalname,
                    imageUrl: url,
                    public_id: public_id,
                    location: coordinates
                })
                .then(() => {
                    res.redirect('/dashboard');
                })
                .catch(error => console.log(error));
        } else {
            User
                .findByIdAndUpdate(user, {
                    status: 'registered',
                    state,
                    address,
                    phoneNumber,
                    location: coordinates
                })
                .then(() => {
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