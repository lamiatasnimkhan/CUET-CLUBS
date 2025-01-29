const asyncHanlder = require("express-async-handler");
const Club = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc register User
//@route POST /api/users
//@access public
const registerClub = asyncHanlder(async (req, res) => {
    const { clubname, email, password } = req.body;
    if (!clubname || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const clubAvailable = await Club.findOne({ email });
    if (clubAvailable) {
        res.status(400);
        throw new Error("Club already registered");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password ", hashedPassword);
    const club = await Club.create({
        clubname,
        email,
        password: hashedPassword
    })
    console.log(`Club created ${club}`);
    if (club) {
        res.status(200).json({ _id: club.id, email: club.email });
    } else {
        res.status(400);
        throw new Error("Club data is not valid");
    }
    //res.json({message:"Register the user"});
});

//@desc login club
//@route POST /api/users
//@access public
const loginClub = asyncHanlder(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fieds are mandatory");
    }
    const club = await Club.findOne({ email });
    if (club && (await bcrypt.compare(password, club.password))) {
        const accessToken = jwt.sign({
            club: {
                clubname: club.clubname,
                email: club.email,
                id: club.id
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "100m" })
        const {_id, clubname, email } = club; // Adjust as per your schema fields
        //res.status(200).json({accessToken});
        res.status(200).json({
            _id,
            clubname,
            email,
            accessToken
        });
    } else {
        res.status(401);
        throw new Error("Email or password in not valid");
    }
    //res.json({message:"Login the club"});
});

//@desc current club
//@route GET /api/users
//@access private
const getClub = asyncHanlder(async (req, res) => {
    const { id } = req.params;
    const club = await Club.findById(id);
    res.status(200).json(club);
});

//@desc get all clubs
//@route GET /api/clubs
//@access public
const getClubs = asyncHanlder(async (req, res) => {
    const clubs = await Club.find({});
    res.status(200).json(clubs);
});

// @desc Edit Club by Club Admin
// @route PUT /api/clubs/edit/:id
// @access Private (Club Admin only)
const editClubByAdmin = asyncHanlder(async (req, res) => {
    const clubId = req.params.id;

    // Check if the club belongs to the logged-in admin
    // if (req.club._id.toString() !== clubId) {
    //     res.status(403);
    //     throw new Error("You are not authorized to edit this club");
    // }

    const { clubname, email, about, phone_number, mailing_address } = req.body;

    const club = await Club.findById(clubId);

    if (!club) {
        res.status(404);
        throw new Error("Club not found");
    }

    // Update club details
    club.clubname = clubname || club.clubname;
    club.email = email || club.email;
    club.about = about || club.about;
    club.phone_number = phone_number || club.phone_number;
    club.mailing_address = mailing_address || club.mailing_address;

    await club.save();

    res.status(200).json(club);
});



module.exports = {
    registerClub, loginClub, getClub, getClubs, editClubByAdmin
}