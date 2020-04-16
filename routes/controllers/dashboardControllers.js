const User = require('../../models/User');
const Case = require('../../models/Case')

let dashboradControllers = {
    //GET DASHBOARD
    getDashboard: (req, res, next) => {
        let { user } = req.session.passport;
        User.findById(user)
        .then( user => {
            Case
                .find()
                .then( cases => {
                    // console.log(cases);
                    console.log({ user: user, cases: cases });
                    // res.send({ user: user, cases: cases });
                    res.render('dashboard/dashboard', { user: user, cases: cases });
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
        
        const {
            title,
            description,
            address,
        } = req.body;
        
        if (req.file) {
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
            .then( response => {
                console.log(response);
                User.findByIdAndUpdate(user, { $push: {casesCreated: response}})
                .then( response => {
                    console.log(response)
                    res.redirect('/dashboard');
                })
                .catch( error => console.log(error))
            })
            .catch(error => console.log(error));
        } else {
            Case.create({
                title: title,
                description: description,
                user: user,
                address: address
            })
            .then( response => {
                console.log(response);
                User.findByIdAndUpdate(user, { $push: {casesCreated: response}})
                .then( response => {
                    console.log(response)
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
                console.log({ owner: owner, case: cases })
                res.render('dashboard/single-case', {data:[{ owner: owner, case: cases }]})
            })
            .catch(error => console.log(error));
    },
    getDeleteCase: (req, res, next) => {
        const caseId = req.params.id;
        let { user } = req.session.passport;

        Case
            .findByIdAndRemove(caseId)
            .then(response => {
                res.redirect('/dashboard');
            })
            .catch(error => console.log(error));

        User
            .findById(user)
            .then(response => {
                let newArr = response.casesCreated.filter(elem => elem._id != caseId)
                User
                    .findByIdAndUpdate(user, {casesCreated: newArr})
                    .then(response => {
                        res.redirect('/dashboard')
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    },
    getEditCase: (req, res, next) => {
        const caseId = req.params.id;
        Case
            .findById(caseId)
            .then(cases => {
                console.log(cases)
                res.render('dashboard/edit-case', cases)
            })
            .catch(error => console.log(error))
    }
}

module.exports = dashboradControllers;