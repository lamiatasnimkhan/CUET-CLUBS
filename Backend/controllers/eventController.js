const asyncHandler = require("express-async-handler");
const eventModel = require("../models/eventsModel");
const clubModel = require("../models/adminModel");
const upload = require('../middleware/upload');

//@desc get all events for a club
//@route GET /api/events/club/:id
//@access public
const getEvents = asyncHandler(async (req, res) => {
    const { club_id } = req.params;
    const events = await eventModel.find({ club_id });
    res.status(200).json(events);
});

//@desc get event by ID for a club
//@route GET /api/events/:id
//@access public
const getEvent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const event = await eventModel.findOne({ _id: id });
    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }
    res.status(200).json(event);
});

//@desc get event by title for a club
//@route GET /api/events/title/:title/club/:id
//@access public
const getEventByTitle = asyncHandler(async (req, res) => {
    const { title } = req.params;
    const event = await eventModel.findOne({ title });
    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }
    res.status(200).json(event);
});

//@desc create event for a club
//@route POST /api/events/club/:id
//@access private
const createEvent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, facebook, drive } = req.body;
    const file = req.file;

    const club = await clubModel.findById(id);
    if (!club) {
        res.status(404);
        throw new Error("Club not found");
    }

    const newEvent = await eventModel.create({
        club_id:id,
        name,
        description,
        facebook,
        drive,
        image: file ? file.path : null,// Save the file path in the event document
    });
    res.status(201).json(newEvent);
});

//@desc update event by ID for a club
//@route PUT /api/events/:id/club/:id
//@access private
const updateEvent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Find the event by ID
        const event = await eventModel.findById(id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const updates = req.body;
        Object.keys(updates).forEach((key) => {
            event[key] = updates[key];
            console.log(event[key]);
        });

        // Save the updated document
        await event.save();

        // Respond with the updated event
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

//@desc delete event by ID for a club
//@route DELETE /api/events/:id/club/:id
//@access private
const deleteEvent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Use findByIdAndDelete method to find and delete the event by its _id
        const deletedEvent = await eventModel.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event deleted successfully', deletedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = {
    getEvents,
    getEvent,
    getEventByTitle,
    createEvent,
    updateEvent,
    deleteEvent
};
