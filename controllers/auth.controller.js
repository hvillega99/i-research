const passport = require('../auth/cas');
const {casLogout} = require("../cas.config.json");
const Resourcesdb = require('../helpers/resourcesdb');

const resources = new Resourcesdb();
const admins = resources.getUsers();

exports.login = (req, res, next) => {
    const authenticate = passport.authenticate(
        'cas', 
        (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                req.session.messages = info.message;
                return res.redirect('/');
            }

        
            if(!(admins.includes(user))){
                return res.redirect('/sin-permiso');
            }

            req.logIn(user, function (err) {
                if (err) {   
                    return next(err);
                }
            //req.session.messages = '';
                                
                adminUser = user;
                
                return res.redirect('/admin');
            });
        }
    );
    
    authenticate(req, res, next);
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect(casLogout);
}