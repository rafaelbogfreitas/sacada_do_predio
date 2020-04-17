const User = require('../../models/User');
const Case = require('../../models/Case');
const cloudinary = require('cloudinary');


let userControllers = {
    // GET USER EDIT
    getEditUser: (req, res, next) => {
        let { user } = req.session.passport;
        User
            .findById(user)
            .then( user => {
                res.render('dashboard/edit-user', {user});
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
            state,
            address,
            phoneNumber
        } = req.body;

        if (req.file) {
            const {
                originalname,
                url
            } = req.file;
            User
                .findByIdAndUpdate(user, {
                    username: username,
                    email: email,
                    state: state,
                    address: address,
                    phoneNumber: phoneNumber,
                    imageName: originalname,
                    imageUrl: url
                })
                .then(() => {
                    res.redirect('/dashboard');
                })
                .catch(error => console.log(error));
        } else {
            User
                .findByIdAndUpdate(user, {
                    username: username,
                    email: email,
                    state: state,
                    address: address,
                    phoneNumber: phoneNumber,
                })
                .then(() => {
                    res.redirect('/dashboard');
                })
                .catch(error => console.log(error));
        }
    },
    // GET DELETE USER
    getDeleteUser: (req, res, next) => {
        let { user } = req.session.passport;

        User
            .findByIdAndRemove(user)
            .then(userToDelete => {
                cloudinary.v2.uploader.destroy(`${userToDelete.public_id}`, function(error,result) {
                    console.log(result, error) });
                Case
                    .find({user: user})
                    .then(casesToDelete => {
                        casesToDelete.forEach(caseToDelete => {
                            cloudinary.v2.uploader.destroy(`${caseToDelete.public_id}`, function(error,result) {
                                console.log(result, error) });
                        });
                        Case
                            .deleteMany({user: user})
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