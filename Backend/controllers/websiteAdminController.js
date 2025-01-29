const asyncHandler = require("express-async-handler");
const Admin = require("../models/websiteAdminModel");
const Club=require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Admin login
// @route POST /api/admin/login
// @access Public
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
        const accessToken = jwt.sign({
            admin: {
                email: admin.email,
                id: admin._id
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const registerAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    // Check if the admin already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
        res.status(400);
        throw new Error("Admin already registered");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const admin = await Admin.create({
        email,
        password: hashedPassword
    });

    if (admin) {
        res.status(201).json({ _id: admin.id, email: admin.email });
    } else {
        res.status(400);
        throw new Error("Invalid admin data");
    }
});

//@desc Delete Club by Admin
//@route DELETE /api/clubs/delete/:id
//@access Private (Website Admin or Club Admin)
const deleteClub = asyncHandler(async (req, res) => {
    const clubId = req.params.id;

    try {
        // Check if the club exists
        const club = await Club.findById(clubId);
        if (!club) {
            res.status(404);
            throw new Error("Club not found");
        }

        // Optional: Check if the requesting user has permission to delete the club
        // For example, if you have a mechanism to differentiate between website admins and club admins:
        // if (req.user.role !== 'admin' && req.club._id.toString() !== clubId) {
        //     res.status(403);
        //     throw new Error("You are not authorized to delete this club");
        // }

        // Delete the club
        await Club.findByIdAndDelete(clubId);

        res.status(200).json({ message: "Club deleted successfully" });
    } catch (error) {
        res.status(500);
        throw new Error(error.message || "An error occurred while deleting the club");
    }
});

module.exports = {
    loginAdmin,
    registerAdmin,
    deleteClub
};