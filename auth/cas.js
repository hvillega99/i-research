const passport = require("passport");
const passportCas = require("passport-cas");

const {casURL, baseURL} = require("../cas.config.json");

const strategy = new passportCas.Strategy(
    {
        ssoBaseURL: casURL, 
        serverBaseURL: baseURL
    }, 

    (login, done) => done(null, login)
)

passport.use(strategy);

passport.serializeUser(
    (user, done) => done(null, user)
);

passport.deserializeUser(
    (user, done) => done(null, user)
);

module.exports = passport;