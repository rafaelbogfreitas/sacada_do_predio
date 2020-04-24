require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');

// // BASIC AUTH
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// // PASSPORT
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// NODEMAILER CONFIG
const transporter = require('./config/nodemailer');


//MONGODB connection
mongoose.connect(process.env.MONGODB_ATLAS, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(x => {
        console.log(`
    Sacada do Prédio está conectada ao MongoDB.
    ==========================================
    Nome da DB: ${x.connections[0].name}
    `)
    })
    .catch(error => console.log('Erro ao conectar na DB ', error));

//TODO - check line 25/26
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


//App initialization
const app = express();

//MIDDLEWARE SETUP

//TODO => logger/morgan
app.use(logger('dev'));
//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Cookie parser
app.use(cookieParser());

// BASIC AUTH MIDDLEWARE SETUP

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 // 1 day
    }),
    rolling: true,
    resave: false,
    saveUninitialized: true
}));

// passport
passport.serializeUser((user, cb) => {
    cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});

// adding flash to be used with passport
app.use(flash());

// passport local strategy
passport.use(new LocalStrategy({
    passReqToCallback: true
}, (req, email, password, next) => {
    User.findOne({
        email
    }, (err, user) => {
        if (err) {
            return next(err);
        }

        // if(!user.verified){  // TODO VERIFY EMAIL
        //     return next(null, false, {
        //         message: "Please confirm your email"
        //     });
        // }

        if (!user) {
            console.log('email not found')
            return next(null, false, {
                message: "Senha ou email incorreto"
            });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            console.log('incorrect password')
            return next(null, false, {
                message: "Senha ou email incorreto"
            });
        }
        // on success
        return next(null, user);
    });
}));

// PASSPORT GOOGLE STRATEGY

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_AUTH_ID,
    clientSecret: process.env.GOOGLE_AUTH_SECRET,
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {

    User.findOne({
            googleID: profile.id
        })
        .then(user => {
            if (user) {
                done(null, user);
                return;
            }

            User.create({
                    googleID: profile.id,
                    username: profile.name.givenName,
                    email: profile.emails[0].value,
                    imageUrl: profile.photos[0].value
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
     <h1 style="color:white; width:90%">Seja Bem-vindo à Sacada, ${newUser.username}!</h1>
     <div style="width:90%; height:60%; background-color:white; box-shadow: 0 0 3px 0 black">
       <h2 style="color:#c84d17; text-align:left; width:90%; margin:10px auto">Obrigado por se juntar a nossa comunidade!</h2>
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
                    done(null, newUser);
                })
                .catch(err => done(err)); // closes User.create()
        })
        .catch(err => done(err)); // closes User.findOne()
}));

app.use(passport.initialize());
app.use(passport.session());

//SASS COMPILING

app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true
}));

//VIEW SETUP (HBS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerHelper('ifUndefined', (value, options) => {
    if (arguments.length < 2) {
        throw new Error('Handlebars helper "ifUndefined" needs one parameter!');
    }

    if (typeof value !== undefined) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

//HBS helper
hbs.registerHelper('if_eq', function (a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

hbs.registerPartials(__dirname + '/views/partials');

//Routes

const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth');
app.use('/', auth);

const dashboard = require('./routes/dashboard');
app.use('/', dashboard);

const register = require('./routes/register');
app.use('/', register);

const api = require('./routes/api');
app.use('/', api);

const user = require('./routes/user');
app.use('/', user);

const caseRoutes = require('./routes/case');
app.use('/', caseRoutes);

module.exports = app;