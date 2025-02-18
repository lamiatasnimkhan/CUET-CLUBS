const express=require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv=require("dotenv").config();
connectDB();
const app=express();

const port= process.env.PORT||4000;
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);

app.use("/api/clubs",require("./routes/adminRoutes"));
app.use("/api/events",require("./routes/eventRoutes"));
app.use("/api/workshops",require("./routes/workshopRoutes"));
app.use("/api/admin", require("./routes/websiteAdminRoute")); // Add admin routes here
app.use("/api/temp-clubs", require("./routes/tempClubRoutes"));
app.use("/api/committee", require("./routes/committeeRoutes"));
app.use("/api/users",require("./routes/clubMemberRoutes"));



app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})