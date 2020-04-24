const User = require('../../models/User');
const Case = require('../../models/Case');
const cloudinary = require('cloudinary');


let userControllers = {
    // GET USER EDIT
    getEditUser: (req, res, next) => {
        let {
            user
        } = req.session.passport;
        User
            .findById(user)
            .then(user => {
                res.render('dashboard/edit-user', {
                    user
                });
            })
            .catch(error => console.log(error));
    },
    // POST USER EDIT
    postEditUser: (req, res, next) => {
        let {
            user
        } = req.session.passport;

        const {
            username,
            email,
            address,
            phoneNumber,
            lat,
            lng
        } = req.body;

        const location = {
            type: 'Point',
            coordinates: [+lng, +lat]
        }

        let userToEdit = {
            username: username,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            location: location
        }

        if (req.file) {
            const {
                originalname,
                url,
                public_id
            } = req.file;

            userToEdit = {
                username: username,
                email: email,
                address: address,
                phoneNumber: phoneNumber,
                imageName: originalname,
                public_id: public_id,
                imageUrl: url,
                location: location
            }

            User.findById(user)
                .then(userToDeleteImage => {
                    cloudinary.v2.uploader.destroy(`${userToDeleteImage.public_id}`, function (error, result) {
                        console.log(result, error)
                    });
                })
                .catch(error => console.log(error));
        }
        User
            .findByIdAndUpdate(user, userToEdit)
            .then(() => {
                res.redirect('/dashboard');
            })
            .catch(error => console.log(error));

    },
    // GET DELETE USER
    getDeleteUser: (req, res, next) => {
        let {
            user
        } = req.session.passport;

        User // VER MONGOOSE PRE
            .findByIdAndRemove(user)
            .then(userToDelete => {
                cloudinary.v2.uploader.destroy(`${userToDelete.public_id}`, function (error, result) {
                    console.log(result, error)
                });
                Case
                    .find({
                        user: user
                    })
                    .then(casesToDelete => {
                        casesToDelete.forEach(caseToDelete => {
                            cloudinary.v2.uploader.destroy(`${caseToDelete.public_id}`, function (error, result) {
                                console.log(result, error)
                            });
                        });
                        Case
                            .deleteMany({
                                user: user
                            })
                            .then(() => {
                                res.redirect('/logout')
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }
}

module.exports = userControllers;