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
                                    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
                                        <html>
                                        <head>
                                            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                                        </head>
                                        <body style="width:100%; height:auto; font-family:Helvetica;">
                                            <header style="width:100%, height:5vh; box-shadow:0px 3px 3px 0 black">
                                            <img style="height:50px" src="https://raw.githubusercontent.com/rafaelbogfreitas/projeto_2/master/public/images/logo.png">
                                            </header>
                                            <main style="background-color:#dc5550; width:100%; height:auto; display:flex; justify-content:flex-start; flex-direction:column; align-items:center">
                                            <h1 style="color:white; width:90%">Seja Bem-vindo à Sacada!</h1>
                                            <div style="width:90%; height:60%; background-color:white; box-shadow: 0 0 3px 0 black">
                                            <h2 style="color:#c84d17; text-align:left; width:90%; margin:10px auto">Obrigado por se juntar a nossa comunidade, ${newUser.username}!</h2>
                                            <p style="width:90%; text-align:left; margin:10px auto">
                                                Vivemos tempos difíceis e os que estão ao nosso lado 
                                                são os quê podemos contar. Nunca foi tão essencial a 
                                                ajuda comunitária e o suporte entre vizinhos. 
                                                O <strong style="color:#dc5550">Sacada do Prédio</strong> é uma iniciativa que tentar contribuir ajudando as comunidades a conectar-se.
                                                </p>
                                                <p style="width:90%; text-align:left; margin:10px auto">
                                                A ideia do nome veio dos vários exemplos de pessoas 
                                                reunidas nas sacadas (ou varandas) em meio ao distanciamento 
                                                social causado pela pandemia de coronavirus.
                                                </p>
                                                <p style="width:90%; text-align:left; margin:10px auto">
                                                Da sacada do prédio nos confraternizamos com vizinhos e familiares,
                                                mas também podemos ver de perto as necessidades da nossa comunidade. 
                                                A pergunta é: Como podemos ajudar?
                                                </p>
                                                <p style="width:90%; text-align:left; margin:10px auto">
                                                A ideia é criar uma plataforma onde os usuários podem cadastrar 
                                                “Casos”, ou necessidades, de modo que as pessoas ao redor possam 
                                                ajudá-lo ou contribuir com a sua causa.
                                                </p>
                                                <p style="width:90%; text-align:left; margin:10px auto">
                                                Quando um novo caso é criado todos os usuários que estão próximos 
                                                àquele caso são notificados por email e podem entrar em contato para 
                                                ajudar.
                                                </p>
                                                <p style="width:90%; text-align:left; margin:10px auto; 
                                                background-color:lightgray; padding:10px; border-radius:5px; 
                                                box-shadow:0 0 5px 0 rgba(0,0,0,0.6)">
                                                Estamos em fase de testes, então por favor dêem uma olhada e 
                                                mandem os seus feedbacks (podem utilizar a bolinha vermelha no 
                                                canto inferior direito pra mandar feebacks).
                                                </p>
                                                <p style="width:90%; text-align:left; margin:20px auto">
                                                Muito obrigado,
                                                </p>
                                                <p style="width:90%; text-align:left; margin:20px auto">
                                                <strong style="color:#dc5550; width:90%; text-align:left; 
                                                margin:20px auto">The Sacada Team</strong>
                                                </p>

                                                
                                            </div>
                                            <div style="color:white; margin-top:10px">&copy; <strong>Sacada Team | 2020</strong></div>
                                            </main>
                                        </body>
                                        </html>

                                `
                        })
                        .then(info => console.log(info))
                        .catch(error => console.log(error))
                            req.flash('success','Novo usuário cadastrado');
                            res.redirect('/');
                        })
                        .catch(error => console.log(error));
                } else {
                    req.flash('error', 'Email já cadastrado');
                    res.redirect('/');
                }
            })
            .catch(error => console.log(error))
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