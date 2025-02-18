const asyncHandler = require("express-async-handler");
const ClubMember = require("../models/clubMemberModel");

const approveuser = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    // Find the user in ClubMember collection
    const ApprovingClubMember = await ClubMember.findById(userId);

    if (!ApprovingClubMember) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update the approve field to true
    ApprovingClubMember.approved = true;
    await ApprovingClubMember.save();

    res.status(200).json({ message: "User approved successfully hehe", user: ApprovingClubMember });
});
const registerClubMember = asyncHandler(async (req, res) => {
    const { fullName, clubId, email, transactionId } = req.body;
    console.log("Club member registration");
    console.log(req.body);
    console.log(req.body.fullName);
    // Check if all fields are provided
    if (!fullName || !clubId || !email || !transactionId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email or transaction ID is already used
    const existingUser = await ClubMember.findOne({ email });
    const existingTransaction = await ClubMember.findOne({ transactionId });

    if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
    }
    if (existingTransaction) {
        return res.status(400).json({ message: "Transaction ID is already used" });
    }

    // Hash the password before saving
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Create new club member entry
    const newMember = await ClubMember.create({
        fullName,
        clubId,
        email,
        transactionId,
    });

    res.status(201).json({ message: "Registration successful, waiting for approval", member: newMember });
});


module.exports = {
    approveuser, registerClubMember
};
