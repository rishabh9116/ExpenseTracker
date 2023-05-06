const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator/check')
const User = require('../../models/User')
var defaultURL = require("../../config/default.json");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ExepenseData = User;

//this is to get all the data present in database
router.get('/', async (req, res) =>{

    User.find()
    .then(result => {
        res.status(200).json({
            userData: result
        })
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).json({
            error: err
        })
    });
});

//this is to post given data from signup page
router.post('/', async (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    var age = "NULL";
    var income = "NULL";
    var profilePicture = "NULL";
    if(!req.body.age){
        console.log("Age Missing Update it in Your Profile Section")
    }else{
        age = req.body.age;
    }
    if(!req.body.income){
        console.log("Income Missing Update it in Your Profile Section")
    }else{
        income = req.body.income;
    }
    if(!req.body.profilePicture){
        console.log("ProfilePicture Missing Update it in Your Profile Section")
    }else{
        profilePicture = req.body.profilePicture;
    }

    try{
        user = new User({
            name,
            email,
            username,
            password,
            age,
            income
        });
        // console.log(age);
        await user.save();
        res.send('User Registered');

    }catch(err){
        console.error("user alread exist");
        res.status(500).send('Server error');
    }
}); 

router.post('/register', async (req, res) => {
    
    
    const name              = req.body.name;
    const email             = req.body.email;
    const username          = req.body.username;
    const password          = req.body.password;
    const age               = 0;
    const gender            = "-";
    const income            = 0;
    const profilePicture    = "https://wallpaperaccess.com/full/467380.jpg";
    
    const food              = 0;
    const clothing          = 0;
    const travel            = 0;
    const dailyAccessories  = 0;
    const extraExpenses     = 0;
    const bonusReceived     = 0;
    const loan              = [];
    const totalExpenses     = 0;
    const totalIncome       = 0;

    var today = new Date();
    var month = today.getMonth() + 1;
    var fullDate = today.getDate() + '/' + month + '/' + today.getFullYear();  

    var monthlyExpenses   = {};
    monthlyExpenses[fullDate] = 0;
    

    try{
        user = new User({
            name,
            email,
            username,
            password,
            age,
            gender,
            income,
            profilePicture,
            food,
            clothing,
            travel,
            dailyAccessories,
            extraExpenses,
            bonusReceived,
            loan,
            totalExpenses,
            totalIncome,
            monthlyExpenses,
        });
        // console.log(age);


        await user.save();
        res.status(200).json({message : "User Registered"});

    }catch(err){
        console.error("user already exist");
        res.status(422).json({error : "user already exist"});
    }
}); 

//this is to get data of a specific user
router.get('/get/:id',(req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id)) {
        User.findById(req.params.id, (error, data) => {
            if (error) {
                // return next(error)
                res.status(422).json({error : "user not find"});
                console.log(error);
            } else {
                res.json(data)
            }
        })
    }
})

//this is to update the specific user
router.put('/update/:id', (req, res) => {
    console.log(req.body);

    const user = {
        name:              req.body.name,
        username:          req.body.username,
        password:          req.body.password,
        age:               req.body.age,
        gender:            req.body.gender,
        income:            req.body.income,
        profilePicture :   req.body.profilePicture,
        food :             req.body.food,
        clothing :         req.body.clothing,
        travel :           req.body.travel,
        dailyAccessories : req.body.dailyAccessories,
        extraExpenses :    req.body.extraExpenses,
        bonusReceived :    req.body.bonusReceived,
        loan :             req.body.loan,
        totalExpenses :    req.body.totalExpenses,
        totalIncome :      req.body.totalIncome,
        monthlyExpenses:   req.body.monthlyExpenses,
    }
    User.findByIdAndUpdate(req.params.id , user, function(err, updatedProfile){
        if(err){
            console.log(err);
            // console.log("2nd error");
        }else{
            console.log(user);
            res.statusCode === 200 ? res.json("profile updated") : res.json('oops something went wrong')
        }
    })
});

//this will be used to delete given user
router.route('/delete/:id').delete((req, res, next) => {
    User.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;

