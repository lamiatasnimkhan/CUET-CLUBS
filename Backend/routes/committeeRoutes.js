const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');
const {
    getCommittees,
    getCommittee,
    createCommittee,
    updateCommittee,
    deleteCommittee
} = require("../controllers/committeeController");

const validateToken = require("../middleware/validateTokenHandler");

// Define routes with conditional application of middleware
router.get('/club/:club_id',  getCommittees);
router.get('/:id/club/:club_id', getCommittee);
//router.get('/title/:title/club/:clubname', getEventByTitle);
router.post('/club/:club_id', validateToken, upload.single('file'), createCommittee);
router.put('/:id', validateToken, updateCommittee);
router.delete('/:id', validateToken, deleteCommittee);
module.exports = router;
