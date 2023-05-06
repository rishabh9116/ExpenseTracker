const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true
    },
    income:{
        type: Number
    },
    food:{
        type: Number,
    },
    clothing:{
        type: Number,
    },
    travel:{
        type: Number,
    },
    dailyAccessories:{
        type: Number,
    },
    extraExpenses:{
        type: Number,
    },
    bonusReceived:{
        type: Number,
    },
    // loan:{
    //     type: Array,
    // },
    totalExpenses:{
        type: Number,
    },
    totalIncome:{
        type: Number,
    },
    monthlyExpenses:{
        type: Object,
    },
})

module.exports = Account = mongoose.model('account', UserSchema);