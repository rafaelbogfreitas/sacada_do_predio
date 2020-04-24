require('dotenv').config();
const User = require('../../models/User');
const Case = require('../../models/Case');

// NODEMAILER CONFIG
const transporter = require('../../config/nodemailer');

let dashboardControllers = {
    // GET DASHBOARD
    getDashboard: (req, res, next) => {
        let {
            user
        } = req.session.passport || null;

        User
            .findById(user)
            .populate('casesCreated') // POPULANDO O ARRAY CASES CREATED PARA MOSTRAR NA DASHBOARD MY CASES
            .then(user => {
                if (user.status == 'registered') {
                    Case
                        .find({
                            location: {
                                $near: {
                                    $geometry: {
                                        type: "Point",
                                        coordinates: [user.location.coordinates[0], user.location.coordinates[1]]
                                    },
                                    $maxDistance: 5000
                                }
                            }
                        })
                        .populate('user')
                        .then(cases => {
                            res.render('dashboard/dashboard', {
                                user: user,
                                cases: cases
                            }); // PASSANDO O USER E CASES PARA A DASHBOARD
                        })
                        .catch(error => console.log(error));
                } else {
                    Case
                        .find()
                        .populate('user')
                        .then(cases => {
                            res.render('dashboard/dashboard', {
                                user: user,
                                cases: cases
                            }); // PASSANDO O USER E CASES PARA A DASHBOARD
                        })
                        .catch(error => console.log(error));
                }
            })
            .catch(error => console.log(error));
    },
    // GET PUBLIC DASHBOARD
    getPublicDashboard: (req, res, next) => {
        Case
            .find()
            .populate('user')
            .then(cases => {
                res.render('dashboard/dashboard', {
                    cases: cases
                }); // PASSANDO O USER E CASES PARA A DASHBOARD
            })
            .catch(error => console.log(error));
    },
    // GET DASHBOARD/CREATE
    getNewCase: (req, res, next) => {
        res.render('dashboard/new-case');
    },
    // POST DASHBOARD/CREATE
    postNewCase: (req, res, next) => {
        let {
            user
        } = req.session.passport || null;
        const {
            title,
            description,
            address,
            lat,
            lng
        } = req.body;

        const location = {
            type: 'Point',
            coordinates: [+lng, +lat]
        }

        let caseToCreate = {
            title: title,
            description: description,
            user: user,
            address: address,
            location: location
        }

        if (req.file) { // CASO TENHA UPLOAD DE IMAGEM
            const {
                originalname,
                url,
                public_id
            } = req.file;

            caseToCreate = {
                title: title,
                description: description,
                imageName: originalname,
                imageUrl: url,
                public_id: public_id,
                user: user,
                address: address,
                location: location
            }
        }

        Case.create(caseToCreate)
            .then(caseResponse => {
                User
                    .findByIdAndUpdate(user, {
                        $push: {
                            casesCreated: caseResponse
                        }
                    }) // PUSH NO ARRAY CASESCREATED
                    .then(() => {
                        res.redirect('/dashboard');
                    })
                    .catch(error => console.log(error))
                User
                    .find({
                        location: {
                            $near: {
                                $geometry: caseResponse.location,
                                $maxDistance: 5000
                            }
                        }
                    })
                    .then(users => {
                        users.forEach(user => {
                            transporter.sendMail({
                                    from: '"Sacada do Prédio" <sacadadopredio@gmail.com>',
                                    to: user.email,
                                    subject: 'Novo caso na sua região',
                                    text: ``,
                                    html: `
                                        <p>Olá ${user.username},</p>

                                        <p>Um novo caso foi registrado na sua região, confira: http://www.sacadadopredio.com/case/${caseResponse._id}</p>

                                        <p>Muito obrigado,</p>

                                        <strong style="rgb(198, 72, 12)">Sacada Team</strong>
                                    `
                                })
                                .then(info => console.log(info))
                                .catch(error => console.log(error))
                        })
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error));
    }
}


module.exports = dashboardControllers;