const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ph_no: {
    type: String,
    required: true,
  },
  profileimg: {
    type: Buffer,
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  preferredLanguage: {
    type: String,
  },
  resData: {
    type: String,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  RMP_NO: {
    type: String,
  },
  RMP_img: {
    type: Buffer,
  },
  remedyList: {
    type: [String],
  },
  bookMarks: {
    type: [String],
  }
});

userSchema.pre("save" , async function(next) {
    const user = this;

    if(!user.isModified("password")) {
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(10)
       user.password = await bcrypt.hash(user.password , salt)
    } catch (error) {
        next(error)
        console.log(error)
    }
})

userSchema.methods.generateToken = function() {
    try {
        return jwt.sign(
        {
            userId : this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin,
            isDoctor : this.isDoctor

        },process.env.jwt_secret_key,
           {
            expiresIn : '1d'
           }
    )
    } catch (error) {
        res.status(500).send("jwt sign error : ",error)
    }
}

module.exports = mongoose.model("user" , userSchema);