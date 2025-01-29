const express=require("express");
const router=express.Router();
const { loginAdmin, registerAdmin ,deleteClub} = require("../controllers/websiteAdminController");
const validateToken = require("../middleware/validateTokenHandler");


// Route for admin login
router.post("/login", loginAdmin);

// Route for admin registration
router.post("/register", registerAdmin);

router.delete("/delete/:id",validateToken, deleteClub);

module.exports = router;
