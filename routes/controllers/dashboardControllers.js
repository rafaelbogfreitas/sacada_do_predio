const User = require('../../models/User');
const Case = require('../../models/Case');


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
                // console.log(`User Location: ${user.location}`)
                Case
                    .find({
                        location: {
                            $near: {
                                $geometry: {
                                    type: "Point",
                                    coordinates: [user.location.coordinates[0] || -12.954675,, user.location.coordinates[1] || -47.873106]
                                },
                                $maxDistance: 5000
                            }
                        }
                    })
                    .populate('user')
                    .then(cases => {
                        // cases.forEach(x => console.log(`Case location ${x.location}`))
                        // console.log(cases)
                        res.render('dashboard/dashboard', {
                            user: user,
                            cases: cases
                        }); // PASSANDO O USER E CASES PARA A DASHBOARD
                    })
                    .catch(error => console.log(error));
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
        // console.log(req.body)
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

        if (req.file) { // CASO TENHA UPLOAD DE IMAGEM
            const {
                originalname,
                url,
                public_id
            } = req.file;

            Case.create({
                    title: title,
                    description: description,
                    imageName: originalname,
                    imageUrl: url,
                    public_id: public_id,
                    user: user,
                    address: address,
                    location: location
                })
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
                })
                .catch(error => console.log(error));
        } else { // CASO NAO HAJA UPLOAD DE IMAGEM
            Case.create({
                    title: title,
                    description: description,
                    user: user,
                    address: address,
                    location: location
                })
                .then(caseResponse => {
                    User
                        .findByIdAndUpdate(user, {
                            $push: {
                                casesCreated: caseResponse
                            }
                        })
                        .then(() => {
                            res.redirect('/dashboard');
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error));
        }
    }
}

module.exports = dashboardControllers;