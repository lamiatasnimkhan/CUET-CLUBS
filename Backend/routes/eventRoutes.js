const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');
const {
    getEvents,
    getEvent,
    getEventByTitle,
    createEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

const validateToken = require("../middleware/validateTokenHandler");

// Define routes with conditional application of middleware
router.get('/club_id/:club_id',  getEvents);
//router.get('/:id',getEvents);
router.get('/:id', getEvent);
router.get('/title/:title/club/:id', getEventByTitle);
router.post('/:id', validateToken, upload.single('file'), createEvent);
router.put('/:id', validateToken, updateEvent);
router.delete('/:id', validateToken, deleteEvent);
module.exports = router;
