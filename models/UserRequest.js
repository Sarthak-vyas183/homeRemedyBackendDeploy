const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
        require : true
    },
    doctorEmail : {
        type : String,
        require : true
    },
    queryType : {
        type : String,
        require : true
    },
    reqDescription : {
        type : String,
        require : true
    },


}); 

module.exports = mongoose.model("UserRequest", requestSchema);
