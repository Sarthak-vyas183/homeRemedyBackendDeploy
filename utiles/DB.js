const mongoose = require("mongoose")
const URI = process.env.Mongodb_URI;

const dbconnet = async () => {
   try {
      console.log("connecting.....")
      try {
         await mongoose.connect(URI);
         console.log("connection success")
      } catch (error) {
         console.log("connection failed", error) 
      } 
   } catch (error) {
      res.send(`Internal server or Network error ! ${error}`) 
   } 
}

module.exports = dbconnet;