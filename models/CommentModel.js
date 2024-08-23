const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    RemedyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Remedy',
        required: true
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
      },
     
      comment: {
        type: String,
        trim: true,
        maxlength: 1000 // Limiting the length of the review text
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
})

module.exports = mongoose.model("comments" , ReviewSchema);