const mongoose = require("mongoose");

const RemedySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    steps: {
        type: String,
        required: true
    },
    ailments: {
        type: String,
        required: true
    },
    effectiveness: {
        type: String,
        required: true
    },
    upload_date: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    image: {
        type: Buffer,
        required: true
    }
});

module.exports = mongoose.model("Remedy", RemedySchema);
