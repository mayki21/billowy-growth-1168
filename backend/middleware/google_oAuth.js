const OAuth2Strategy = require('passport-google-oauth20')
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
const { userModel } = require('../model/user.model');

passport.use(new OAuth2Strategy({
    clientID: '710717229461-tavhtq9lb0bbsqiqhbghis5r27hj38tg.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8008/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        const user = new userModel({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: uuidv4() //use uuid for validating the password uuidv4()
        })
        await user.save()
        console.log(profile);
        return cb(null, user);
    }

));

module.exports = { passport }