const express = require("express");
const { approveClub, signupTempClub, getTempClubs, editTempClub, deleteTempClub } = require("../controllers/tempClubController");
const validateTokenHandler = require("../middleware/validateTokenHandler");
const upload = require("../middleware/upload");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

// Route for registering a new temp club with file upload
router.post('/signup', upload.single('file'), signupTempClub);

// Route for approving a temp club
router.post('/approve/:id', approveClub);

// Route for getting all temp clubs
router.get('/', getTempClubs);

// Route for editing a temp club with file upload
//router.put('/edit/:id', upload.single('file'), editTempClub);

// Route for deleting a temp club
router.delete('/delete/:id',validateToken, deleteTempClub);


module.exports = router;
