const Case = require('../../models/Case');

let apiControllers = {
    
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