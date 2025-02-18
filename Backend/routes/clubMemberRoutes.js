const express = require("express");
const { registerClubMember,approveuser} = require("../controllers/clubMemberController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// Route for club member registration
router.post("/register", registerClubMember);
router.put("/approve/:id",validateToken, approveuser);

module.exports = router;
