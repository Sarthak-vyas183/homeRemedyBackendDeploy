const mongoose = require("mongoose")
const URI = process.env.Mongodb_URI;

const dbconnet = async () => {
    console.log("connecting.....")
    try {
       await mongoose.connect(URI);
       console.log("connection success")
    } catch (error) {
       console.log("connection failed", error) 
    }
}

module.exports = dbconnet;