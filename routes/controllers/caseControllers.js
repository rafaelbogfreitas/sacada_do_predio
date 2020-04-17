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
            address
        } = req.body

        if (req.file) {
            const {
                originalname,
                url,
                public_id,
            } = req.file;
            
            Case
                .findByIdAndUpdate(caseId, {
                    title: title,
                    description: description,
                    imageName: originalname,
                    imageUrl: url,
                    public_id: public_id,
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
    }
}

module.exports = caseControllers;