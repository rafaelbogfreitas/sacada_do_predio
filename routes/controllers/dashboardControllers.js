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
    }
}

module.exports = dashboardControllers;