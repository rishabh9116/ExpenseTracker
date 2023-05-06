const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator/check')
const User = require('../../models/User')
const Account = require('../../models/Account')
var defaultURL = require("../../config/default.json");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ExepenseData = Account;

//this is to post given data from signup page
router.post('/', async (req, res) => {

    
    const email = req.body.email;
    var income = "NULL";
    
    
    if(!req.body.income){
        console.log("Income Missing Update it in Your Profile Section")
    }else{
        income = req.body.income;
    }

    try{
        account = new Account({
            email,
            income
        });
        // console.log(age);
        await account.save();
        res.send('User Registered');

    }catch(err){
        console.error("user alread exist");
        res.status(500).send('Server error');
    }
}); 

router.post('/register', async (req, res) => {
    
    
   
    const email             = req.body.email;
    const income            = 0;
    const food              = 0;
    const clothing          = 0;
    const travel            = 0;
    const dailyAccessories  = 0;
    const extraExpenses     = 0;
    const bonusReceived     = 0;
    
    const totalExpenses     = 0;
    const totalIncome       = 0;

    var today = new Date();
    var month = today.getMonth() + 1;
    var fullDate = today.getDate() + '/' + month + '/' + today.getFullYear();  

    var monthlyExpenses   = {};
    monthlyExpenses[fullDate] = 0;
    

    try{
        account = new Account({
           
            email,
           
            income,
           
            food,
            clothing,
            travel,
            dailyAccessories,
            extraExpenses,
            bonusReceived,
            
            totalExpenses,
            totalIncome,
            monthlyExpenses,
        });
        // console.log(age);


        await account.save();
        res.status(200).json({message : "User Registered"});

    }catch(err){
        console.error("user already exist");
        res.status(422).json({error : "user already exist"});
    }
}); 

//this is to get all the data present in database
router.get('/', async (req, res) =>{

    Account.find()
    .then(result => {
        res.status(200).json({
            userData1: result
        })
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).json({
            error: err
        })
    });
});

//this is to get data of a specific user
router.get('/get/:id',(req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id)) {
        Account.findById(req.params.id, (error, data) => {
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

    const account = {
        income:            req.body.income,
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
    Account.findByIdAndUpdate(req.params.id , account, function(err, updatedProfile){
        if(err){
            console.log(err);
            // console.log("2nd error");
        }else{
            console.log(account);
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
 

router.post('/login',async(req,res) =>{
    const {email} = req.body;
    
    if(!email )
    {
        return res.status(400).json({error : "Field Incomplete"});
    }
   const userLogin =await Account.findOne({email : email});
    //then((userLogin) =>{
        if(userLogin)
        {
            res.status(200).json({
                message : "User Signin Successfully",
                accountID  : userLogin.id
            });
        }
        else
        {
            res.status(400).json({message : "Wrong Details"});
        }
       
    
});

module.exports = router;