const asyncHandler = require("express-async-handler");
const committeeModel = require("../models/committeeModel");
const clubModel = require("../models/adminModel");
const upload = require('../middleware/upload');

//@desc get all members for a club
//@route GET /api/committee/club/:club_id
//@access public
const getCommittees = asyncHandler(async (req, res) => {
    const { club_id } = req.params;
    const committees = await committeeModel.find({ club_id });
    res.status(200).json(committees);
});

//@desc get committee by ID for a club
//@route GET /api/events/:id/club/:club_id
//@access public
const getCommittee = asyncHandler(async (req, res) => {
    const { id, club_id } = req.params;
    const committee = await committeeModel.findOne({ _id: id, club_id });
    if (!committee) {
        res.status(404);
        throw new Error("Event not found");
    }
    res.status(200).json(committee);
});

//@desc create event for a club
//@route POST /api/committee/club/:club_id
//@access private
const createCommittee = asyncHandler(async (req, res) => {
    const { club_id } = req.params;
    const { name, position, facebook, instagram, linkedin, email } = req.body;
    const file = req.file;

    const club = await clubModel.findById(club_id);
    console.log(club_id, req.body);
    if (!club) {
        res.status(404);
        throw new Error("Club not found");
    }
    
    const newCommittee = await committeeModel.create({
        club_id,
        name,
        position, 
        facebook, 
        instagram, 
        linkedin, 
        email,
        file: file ? file.path : null,// Save the file path in the event document
    });
    res.status(201).json(newCommittee);
});

//@desc update event by ID for a club
//@route PUT /api/committee/:id
//@access private
const updateCommittee = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Find the event by ID
        const committee = await committeeModel.findById(id);

        if (!committee) {
            return res.status(404).json({ message: 'Member not found' });
        }

        const updates = req.body;
        Object.keys(updates).forEach((key) => {
            committee[key] = updates[key];
            console.log(committee[key]);
        });

        // Save the updated document
        await committee.save();

        // Respond with the updated event
        res.status(200).json(committee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

//@desc delete event by ID for a club
//@route DELETE /api/events/:id/club/:clubname
//@access private
const deleteCommittee = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Use findByIdAndDelete method to find and delete the event by its _id
        const deletedCommittee = await committeeModel.findByIdAndDelete(id);

        if (!deletedCommittee) {
            return res.status(404).json({ message: 'Member not found' });
        }

        res.json({ message: 'Deleted successfully', deletedCommittee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports={
    getCommittees,
    getCommittee,
    createCommittee,
    updateCommittee,
    deleteCommittee
}
