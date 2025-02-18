const mongoose = require('mongoose');

const tempClubSchema = mongoose.Schema(
  {
    clubname: {
      type: String,
      required: [true, "Please enter a club name"]
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: [true, "Email is already in use"]
    },
    password: {
      type: String,
      required: [true, "Please enter a password"]
    },
    about: {
      type: String
    },
    file: {
      type: String, // This will store the file path of the uploaded image
    },
    phone_number: {
      type: String,
      //required: [true,"Please enter a phone number"]
    },
    mailing_address: {
      type: String,
      //required: [true,"Please enter a mailing address"]
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

module.exports = mongoose.model("TempClub", tempClubSchema);
