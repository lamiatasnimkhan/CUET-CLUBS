const asyncHandler = require("express-async-handler");
const workshopModel = require("../models/workshopModel");
const clubModel = require("../models/adminModel");
const upload = require('../middleware/upload');

//@desc get all workshops for a club
//@route GET /api/workshops/club/:club_id
//@access public
const getWorkshops = asyncHandler(async (req, res) => {
    const { club_id } = req.params;
    const workshops = await workshopModel.find({ club_id });
    res.status(200).json(workshops);
});

//@desc get workshop by ID for a club
//@route GET /api/workshops/:id/club/:club_id
//@access public
const getWorkshop = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const workshop = await workshopModel.findOne({ _id: id });
    if (!workshop) {
        res.status(404);
        throw new Error("Workshop not found");
    }
    res.status(200).json(workshop);
});

//@desc get workshop by title for a club
//@route GET /api/workshops/title/:title/club/:club_id
//@access public
const getWorkshopByTitle = asyncHandler(async (req, res) => {
    const { title, club_id } = req.params;
    const workshop = await workshopModel.findOne({ title, club_id });
    if (!workshop) {
        res.status(404);
        throw new Error("Workshop not found");
    }
    res.status(200).json(workshop);
});

//@desc create workshop for a club
//@route POST /api/workshops/club/:club_id
//@access private
const createWorkshop = asyncHandler(async (req, res) => {
    const { club_id } = req.params;
    const { title, description, mentors, videoLinks } = req.body;
    console.log(req.body);
    const file = req.file;
    const club = await clubModel.findById(club_id);
    if (!club) {
        res.status(404);
        throw new Error("Club not found");
    }
    const parsedMentorList = Array.isArray(mentors) ? mentors : [mentors];
    const parsedVideoLinkList = Array.isArray(videoLinks) ? videoLinks : [videoLinks];
    const newWorkshop = await workshopModel.create({
        title,
        description,
        file: file ? file.path : null,
        mentors: parsedMentorList,
        videoLinks: parsedVideoLinkList,
        club_id, // Save the file path in the workshop document
    });
    console.log(req.body);
    res.status(201).json(newWorkshop);
});

//@desc update workshop by ID for a club
//@route PUT /api/workshops/:id
//@access private
const updateWorkshop = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Find the workshop by ID
        const workshop = await workshopModel.findById(id);

        if (!workshop) {
            return res.status(404).json({ message: "Workshop not found" });
        }

        const updates = req.body;
        Object.keys(updates).forEach((key) => {
            workshop[key] = updates[key];
        });

        // Save the updated document
        await workshop.save();

        // Respond with the updated workshop
        res.status(200).json(workshop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

//@desc delete workshop by ID
//@route DELETE /api/workshops/:id
//@access private
const deleteWorkshop = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Use findByIdAndDelete method to find and delete the workshop by its _id
        const deletedWorkshop = await workshopModel.findByIdAndDelete(id);

        if (!deletedWorkshop) {
            return res.status(404).json({ message: "Workshop not found" });
        }

        res.json({ message: "Workshop deleted successfully", deletedWorkshop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

//@desc edit video link in a workshop
//@route PUT /api/workshops/:id/videos/:index
//@access private
const editVideoLink = asyncHandler(async (req, res) => {
    const { id, index } = req.params;
    const { newVideoLink } = req.body;

    try {
        // Find the workshop by ID
        const workshop = await workshopModel.findById(id);

        if (!workshop) {
            return res.status(404).json({ message: "Workshop not found" });
        }

        // Check if the index is valid
        if (index < 0 || index >= workshop.videoLinks.length) {
            return res.status(404).json({ message: "Video link index out of range" });
        }
        console.log(req.body);
        // Update the video link at the specified index
        workshop.videoLinks[index] = newVideoLink;

        // Save the updated document
        await workshop.save();

        // Respond with the updated workshop
        res.status(200).json(workshop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

//@desc delete video link in a workshop
//@route DELETE /api/workshops/:id/videos/:index
//@access private
const deleteVideoLink = asyncHandler(async (req, res) => {
    const { id, index } = req.params;

    try {
        // Find the workshop by ID
        const workshop = await workshopModel.findById(id);

        if (!workshop) {
            return res.status(404).json({ message: "Workshop not found" });
        }

        // Check if the index is valid
        if (index < 0 || index >= workshop.videoLinks.length) {
            return res.status(404).json({ message: "Video link index out of range" });
        }

        // Remove the video link at the specified index
        workshop.videoLinks.splice(index, 1);

        // Save the updated document
        await workshop.save();

        // Respond with the updated workshop
        res.status(200).json(workshop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

//@desc upload a single video link in a workshop
//@route POST /api/workshops/:id/videos
//@access private
const uploadVideo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { videoLink } = req.body; // Expecting a single video link

    try {
        // Find the workshop by ID
        const workshop = await workshopModel.findById(id);

        if (!workshop) {
            return res.status(404).json({ message: "Workshop not found" });
        }

        // Add the video link to the videoLinkList
        if (typeof videoLink === 'string' && videoLink.trim() !== '') {
            workshop.videoLinks.push(videoLink);
        } else {
            return res.status(400).json({ message: "Invalid data format. Expected a non-empty string for the video link." });
        }

        // Save the updated document
        await workshop.save();

        // Respond with the updated workshop
        res.status(200).json(workshop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = {
    getWorkshops,
    getWorkshop,
    getWorkshopByTitle,
    createWorkshop,
    updateWorkshop,
    deleteWorkshop,
    editVideoLink,
    deleteVideoLink,
    uploadVideo,
};
