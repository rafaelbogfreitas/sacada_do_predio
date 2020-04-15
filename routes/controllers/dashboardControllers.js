const User = require('../../models/User');

let dashboradControllers = {
    //GET DASHBOARD
    getDashboard: (req, res, next) => {
        let { user } = req.session.passport;
        User.findById(user)
        .then( user => {
            console.log(user);
            res.render('dashboard/dashboard', { user: user });
        })
        .catch(error => console.log(error));
    }
    //GET DASHBOARD/CREATE
    //POST DASHBOARD/CREATE
    //DELETE DASHBOARD/DELETE/:ID
    //GET DASHBOARD/EDIT/:ID
    //POST DASHBOARD/EDIT/:ID
}

module.exports = dashboradControllers;