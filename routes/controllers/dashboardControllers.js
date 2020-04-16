const User = require('../../models/User');
const Case = require('../../models/Case');


let dashboardControllers = {
    // GET DASHBOARD
    getDashboard: (req, res, next) => {
        let { user } = req.session.passport;
        User
            .findById(user)
            .populate('casesCreated') // POPULANDO O ARRAY CASES CREATED PARA MOSTRAR NA DASHBOARD MY CASES
            .then( user => {
                Case
                    .find()
                    .then( cases => {
                        res.render('dashboard/dashboard', { user: user, cases: cases }); // PASSANDO O USER E CASES PARA A DASHBOARD
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
        let { user } = req.session.passport;
        // console.log(req.body)
        const {
            title,
            description,
            address,
        } = req.body;
        
        if (req.file) { // CASO TENHA UPLOAD DE IMAGEM
            const {
                originalname,
                url
            } = req.file;
            
            Case.create({
                title: title,
                description: description,
                imageName: originalname,
                imageUrl: url,
                user: user,
                address: address
            })
            .then( caseResponse => {
                User
                    .findByIdAndUpdate(user, { $push: {casesCreated: caseResponse} }) // PUSH NO ARRAY CASESCREATED
                    .then( () => {
                        res.redirect('/dashboard');
                    })
                    .catch( error => console.log(error))
            })
            .catch(error => console.log(error));
        } else { // CASO NAO HAJA UPLOAD DE IMAGEM
            Case.create({
                title: title,
                description: description,
                user: user,
                address: address
            })
            .then( caseResponse => {
                User
                    .findByIdAndUpdate(user, { $push: {casesCreated: caseResponse} })
                    .then( () => {
                        res.redirect('/dashboard');
                    })
                    .catch( error => console.log(error))
            })
            .catch(error => console.log(error));
        }
    },
    // GET DASHBOARD/CASE/:ID
    getCaseById: (req, res, next) => {
        const caseId = req.params.id;
        let { user } = req.session.passport;
        let owner = false;

        Case
            .findById(caseId)
            .populate('user')
            .then(cases => {
                if (user == cases.user._id) {
                    owner = true;
                }
                res.render('dashboard/single-case', {data:[{ owner: owner, case: cases }]})
            })
            .catch(error => console.log(error));
    },
    // GET CASE/DELETE/:ID
    getDeleteCase: (req, res, next) => {
        const caseId = req.params.id;
        let { user } = req.session.passport;

        Case
            .findByIdAndRemove(caseId)
            .then(() => {
                
                User.findByIdAndUpdate(user, 
                { $pull: {casesCreated:caseId}})
                .then( _ => res.redirect('/dashboard'))
                .catch( error => console.log(error));

            })
            .catch(error => console.log(error));
    },
    // GET CASE/EDIT/:ID
    getEditCase: (req, res, next) => {
        const caseId = req.params.id;
        Case
            .findById(caseId)
            .then(cases => {
                res.render('dashboard/edit-case', cases)
            })
            .catch(error => console.log(error))
    },
    // POST CASE/EDIT/:ID
    postEditCase: (req, res, next) => {
        const caseId = req.params.id;
        let { user } = req.session.passport;

        const {
            title,
            description,
            address
        } = req.body

        if (req.file) {
            const {
                originalname,
                url
            } = req.file;
            
            Case
                .findByIdAndUpdate(caseId, {
                    title: title,
                    description: description,
                    imageName: originalname,
                    imageUrl: url,
                    user: user,
                    address: address
                })
                .then(() => {
                    res.redirect('/dashboard');
                })
                .catch(error => console.log(error));
        } else {
            Case
                .findByIdAndUpdate(caseId, {
                    title: title,
                    description: description,
                    user: user,
                    address: address
                })
                .then(() => {
                    res.redirect('/dashboard');
                })
                .catch(error => console.log(error));
        }
    },
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
    }
}

module.exports = dashboardControllers;