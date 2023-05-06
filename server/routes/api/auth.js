const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator')
const User = require('../../models/User')
var defaultURL = require("../../config/default.json");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ExepenseData = User;


router.get('/', (req, res) => res.send('Auth route'));

router.post('/login',async(req,res) =>{
    const {email,password} = req.body;
    let token;
    if(!email || !password )
    {
        return res.status(400).json({error : "Field Incomplete"});
    }
   const userLogin =await User.findOne({email : email});
    //then((userLogin) =>{
        if(userLogin)
        {
            const match=await bcrypt.compare(password,userLogin.password);
            if(match)
            {
                token =await userLogin.generateAuthToken();
                console.log(token);
                userLogin.token = token;
                res.status(200).json({
                    message : "User Signin Successfully",
                    userID  : userLogin.id,
                    isAuth  : true,
                    token   : token
                });
                // res.cookie("jwttoken", token, {
                //     expires: "2hrs",
                //     httpOnly
                // });
            } 
            else
            {
                res.status(400).json({message : "Wrong Details"});
            }
        }
        else
        {
            res.status(400).json({message : "Wrong Details"});
        }
       
    
});
const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/login');
    }
}
// router.use(
//     session({
//         secret: "key that will sin cookie",
//         resave: false,
//         saveUninitialized: false,
//         store: store, 
//     })
// )


module.exports = router;