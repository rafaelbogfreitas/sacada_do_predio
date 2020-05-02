const User = require('../../models/User');
const Case = require('../../models/Case');
const cloudinary = require('cloudinary');

let caseControllers = {
    // GET CASE/DELETE/:ID
    getDeleteCase: (req, res, next) => {
        const caseId = req.params.id;
        let { user } = req.session.passport;

        Case
            .findByIdAndRemove(caseId)
            .then(caseToRemove => {
                cloudinary.v2.uploader.destroy(`${caseToRemove.public_id}`, function(error,result) {
                    console.log(result, error) });
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
            address,
            lat,
            lng
        } = req.body

        const location = {
            type: 'Point',
            coordinates: [+lng, +lat]
        }

        let caseToEdit = {
            title: title,
            description: description,
            user: user,
            address: address,
            location: location
        }

        if (req.file) {
            const {
                originalname,
                url,
                public_id,
            } = req.file;

            caseToEdit = {
                title: title,
                description: description,
                imageName: originalname,
                imageUrl: url,
                public_id: public_id,
                user: user,
                address: address,
                location: location
            }

            Case.findById(caseId)
                .then(caseToDelete => {
                    cloudinary.v2.uploader.destroy(`${caseToDelete.public_id}`, function(error,result) {
                        console.log(result, error) });
                })
                .catch(error => console.log(error));
            }
        Case
            .findByIdAndUpdate(caseId, caseToEdit)
            .then(() => {
                res.redirect('/dashboard');
            })
            .catch(error => console.log(error));
    
    },
    // GET CASE/:ID
    getCaseById: (req, res, next) => {
        const caseId = req.params.id;
        let owner = false;
        
        Case
        .findById(caseId)
        .populate('user')
        .then(cases => {
            //Dynamic metatags info
            res.locals.metaTags = {
                    "twitter:description": cases.description,   
                    "twitter:title": cases.title,   
                    "twitter:image": cases.imageUrl,
                    "og:title":cases.title,
                    "og:description": cases.description,
                    "og:url":"http://sacadadopredio.com/case/" + cases._id,
                    "og:image":cases.imageUrl,   
            }

            let data = {data:[{ owner: owner, case: cases}]}
            if (req.session.passport) {
                let { user } = req.session.passport;
                data = {data:[{ owner: owner, case: cases, user: user }]};
                if (user == cases.user._id) {
                    owner = true;
                    data = {data:[{ owner: owner, case: cases, user: user }]};
                }
            }
            res.render('dashboard/single-case', data)
        })
        .catch(error => console.log(error));
    }
}


module.exports = caseControllers;