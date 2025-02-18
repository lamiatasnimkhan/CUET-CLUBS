const asyncHandler = require("express-async-handler");
const TempClub = require('../models/tempClubModel');
const Club = require('../models/adminModel');
const upload = require('../middleware/upload'); // Assuming this is your multer setup
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Approve and transfer Temp Club to main database
// @route POST /api/temp-clubs/approve/:id
// @access Private (Admin only)
const approveClub = asyncHandler(async (req, res) => {
    const clubId = req.params.id;

    const tempClub = await TempClub.findById(clubId);

    if (!tempClub) {
        return res.status(404).json({ message: 'Club not found' });
    }

    const club = await Club.create({
        clubname: tempClub.clubname,
        email: tempClub.email,
        password: tempClub.password,
        about: tempClub.about,
        file: tempClub.file,
        phone_number: tempClub.phone_number,
        mailing_address: tempClub.mailing_address,
    });

    await TempClub.findByIdAndDelete(clubId);

    res.status(200).json({ message: 'Club data approved and transferred successfully', club });
});

// @desc Register Temp Club
// @route POST /api/temp-clubs/signup
// @access Public
const signupTempClub = asyncHandler(async (req, res) => {

    const { clubname, email, password, about, phone_number, mailing_address } = req.body;
    //const file = req.file; // This is the uploaded file

    const hashedPassword = await bcrypt.hash(password, 10);

    const tempClub = await TempClub.create({
        clubname,
        email,
        password:hashedPassword,
        about,
        phone_number,
        mailing_address
    });

    res.status(201).json({ message: 'Club signed up successfully', tempClub });
});

// @desc Get all Temp Clubs
// @route GET /api/temp-clubs
// @access Private (Admin only)
const getTempClubs = asyncHandler(async (req, res) => {
    const tempClubs = await TempClub.find({});
    res.status(200).json(tempClubs);
});

// @desc Edit Temp Club
// @route PUT /api/temp-clubs/edit/:id
// @access Private (Admin only)
const editTempClub = asyncHandler(async (req, res) => {
    const clubId = req.params.id;
    const { clubname, email, about, phone_number, mailing_address } = req.body;
    const file = req.file; // This is the new uploaded file, if any

    const tempClub = await TempClub.findById(clubId);

    if (!tempClub) {
        return res.status(404).json({ message: 'Club not found' });
    }

    tempClub.clubname = clubname || tempClub.clubname;
    tempClub.email = email || tempClub.email;
    tempClub.about = about || tempClub.about;
    tempClub.file = file ? file.path : tempClub.file;
    tempClub.phone_number = phone_number || tempClub.phone_number;
    tempClub.mailing_address = mailing_address || tempClub.mailing_address;

    await tempClub.save();

    res.status(200).json({ message: 'Club updated successfully', tempClub });
});

// @desc Delete Temp Club
// @route DELETE /api/temp-clubs/delete/:id
// @access Private (Admin only)
const deleteTempClub = asyncHandler(async (req, res) => {
    const clubId = req.params.id;

    const tempClub = await TempClub.findById(clubId);

    if (!tempClub) {
        return res.status(404).json({ message: 'Club not found' });
    }

    await TempClub.findByIdAndDelete(clubId);


    res.status(200).json({ message: 'Club deleted successfully' });
});

module.exports = {
    approveClub,
    signupTempClub,
    getTempClubs,
    editTempClub,
    deleteTempClub
};
