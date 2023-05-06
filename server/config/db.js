const mongoose = require('mongoose');
const config = require('config');
const db = "mongodb+srv://root:ExpenseManager@expensemanager.ydqmv.mongodb.net/User?retryWrites=true";
const connectDB = async() =>{
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true
        });
        console.log('MongoDB Connected...');
        
        
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
