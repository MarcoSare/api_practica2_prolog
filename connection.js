const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connection successful")

}).catch((error)=>{
    console.log(error);
}); 

module.export = mongoose;