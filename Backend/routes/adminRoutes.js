const express=require("express");
const router=express.Router();
const {
    registerClub,
    loginClub,
    getClub,
    getClubs,
    editClubByAdmin
}=require("../controllers/adminController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register",registerClub);
router.post("/login",loginClub);
router.get("/club/:id",getClub);

router.put("/edit/:id",validateToken,editClubByAdmin); 
router.get("",getClubs);

module.exports=router;