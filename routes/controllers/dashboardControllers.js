const User = require('../../models/User');
const Case = require('../../models/Case')

let dashboradControllers = {
    //GET DASHBOARD
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
    //GET DASHBOARD/CREATE
    getNewCase: (req, res, next) => {
        res.render('dashboard/new-case');
    },
    //POST DASHBOARD/CREATE
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
    getCaseById: (req, res, next) => {
        const caseId = req.params.id;
        let { user } = req.session.passport;
        let owner = false;

        Case
            .findById(caseId)
            .then(cases => {
                if (user == cases.user) {
                    owner = true;
                }
                res.render('dashboard/single-case', {data:[{ owner: owner, case: cases }]})
            })
            .catch(error => console.log(error));
    },
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
    getEditCase: (req, res, next) => {
        const caseId = req.params.id;
        Case
            .findById(caseId)
            .then(cases => {
                res.render('dashboard/edit-case', cases)
            })
            .catch(error => console.log(error))
    },
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
    }
}

module.exports = dashboradControllers;