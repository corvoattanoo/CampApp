const express = require('express')
const router = express.Router({mergeParams: true})
const User = require('../models/user')
const catchAsync = require('../utilities/catchAsync')
const passport = require('passport')
const {storeReturnTo} = require('../middleware')

router.get('/register', (req,res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async(req, res) => {
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
}))

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login',storeReturnTo, passport.authenticate('local',{failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'welcome back')
    const redirectUrl = res.locals.returnTo || '/campgrounds'
    res.redirect(redirectUrl)
})


router.get('/logout' , (req, res,next) => {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }else
        req.flash('success', 'You logged out')
        res.redirect('/campgrounds')
      });
    
})

module.exports = router