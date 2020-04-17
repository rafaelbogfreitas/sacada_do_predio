const User = require('../../models/User');
const Case = require('../../models/Case');

let apiControllers = {
    userApi: function(req, res, next) {
        User.find()
        .populate('casesCreated')
            .then( users => {
                res.send(users);
            })
            .catch( error => console.log( error));
    },
    casesApi: function(req, res, next) {
        Case.find()
        .populate('user')
            .then( cases => {
                res.send(cases);
            })
            .catch( error => console.log( error));
    }
}

module.exports = apiControllers;