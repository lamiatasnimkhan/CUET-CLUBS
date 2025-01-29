const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');
const {
    getWorkshops,
    getWorkshop,
    getWorkshopByTitle,
    createWorkshop,
    updateWorkshop,
    deleteWorkshop,
    editVideoLink,
    deleteVideoLink,
    uploadVideo
} = require("../controllers/workshopController");

const validateToken = require("../middleware/validateTokenHandler");

// Define routes with conditional application of middleware
router.get('/club/:club_id', getWorkshops);
router.get('/:id', getWorkshop);
router.get('/title/:title/club/:club_id', getWorkshopByTitle);
router.post('/club/:club_id', validateToken, upload.single('file'), createWorkshop);
router.put('/:id', validateToken, upload.single('file'), updateWorkshop);
router.delete('/:id', validateToken, deleteWorkshop);

// Routes for editing and deleting video links
router.put('/:id/index/:index', validateToken, editVideoLink);
router.delete('/:id/index/:index', validateToken, deleteVideoLink);

// Route for uploading individual videos
router.post('/:id', validateToken, upload.single('video'), uploadVideo);

module.exports = router;
