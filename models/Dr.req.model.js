const mongoose = require("mongoose");
const { boolean } = require("zod");

const DrReqSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
        require : true
    },
    RMP_No : {
        type : String,
        require : true
    },
    RMP_img : {
        type: Buffer,
        required: true
    },
    Accept : {
         type : Boolean,
         default :false
    }, 
    ignore: {
        isIgnore: {
            type: Boolean,
            default: false
        },
        reason: {
            type: String,
            default: ""
        }
    }
})

module.exports = mongoose.model("DrReq" , DrReqSchema);