//bcrypt
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');

// NODEMAILER CONFIG
const transporter = require('../../config/nodemailer');

//User model
const User = require("../../models/User");

let authControllers = {
    signupPost: (req, res, next) => {
        const {
            username,
            password,
            email
        } = req.body;

        let salt = bcrypt.genSaltSync(bcryptSalt);
        let hash = bcrypt.hashSync(password, salt);

        User
            .find({
                email: email
            })
            .then(response => {
                if (response.length == 0) {
                    User.create({
                            username: username,
                            email,
                            password: hash,
                        })
                        .then(newUser => {
                            transporter.sendMail({
                                    from: '"Sacada do Prédio" <sacadadopredio@gmail.com>',
                                    to: newUser.email,
                                    subject: 'Seja bem-vindo à sacada!',
                                    text: ``,
                                    html: `
                                    <p>Olá ${newUser.username}, seja bem-vindo!</p>
                                    
                                    <p>Muito obrigado,</p>
        
                                    <strong style="rgb(198, 72, 12)">Sacada Team</strong>
                                `
                                })
                                .then(info => console.log(info))
                                .catch(error => console.log(error))
                            req.flash('success', 'Novo usuário cadastrado');
                            res.redirect('/');
                        })
                        .catch(error => console.log(error));
                } else {
                    req.flash('error', 'Email já cadastrado');
                    res.redirect('/');
                }
            })
            .catch(error => console.log(error))
        // res.redirect('/');
    },

    loginPost: passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/",
        failureFlash: true,
        passReqToCallback: true,
    }),

    logoutPost: (req, res) => {
        req.logout();
        res.redirect("/");
    }
}

module.exports = authControllers;