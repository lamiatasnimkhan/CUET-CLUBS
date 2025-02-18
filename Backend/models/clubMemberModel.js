const mongoose = require('mongoose');

const clubMemberSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Please enter your full name"],
        },
        clubId:{
            type : String,
            required: [true],
        },
        email: {
            type: String,
            required: [true, "Please enter an email"],
            unique: [true, "Email is already in use"],
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
        },
        transactionId: {
            type: String,
            required: [true, "Please enter a transaction ID"],
            unique: [true, "Transaction ID is already used"],
        },
        approved: {
          type: Boolean,
          default: false // Flag to indicate if the club has been approved
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("ClubMember", clubMemberSchema);
