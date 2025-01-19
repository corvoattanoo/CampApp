const User = require('../models/user')

module.exports.renderRegister = (req,res) => {
    res.render('users/register')
}

module.exports.register = async(req, res) => {
    try {
        const {username, password, email} = req.body
        const user = new User({email, username})
        const registeredUser = await User.register(user, password)
        //after register automaticly logged in
        req.login(registeredUser, err=>{
            if(err)return next(err)
            req.flash('success', 'Welcome to Camp')
            res.redirect('/campgrounds')
        })      
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/register')
    }       
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back')
    const redirectUrl = res.locals.returnTo || '/campgrounds'
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res,next) => {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }else
        req.flash('success', 'You logged out')
        res.redirect('/campgrounds')
      });
    
}