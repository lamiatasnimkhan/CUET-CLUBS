const asyncHanlder = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHanlder(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Club is not authorized");
            }else{
                req.club=decoded.club;
                next();
            }
        });
        if(!token){
            res.status(401);
                throw new Error("Club is not authorized or missing token");
        }
    }
});
module.exports=validateToken;