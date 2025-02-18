const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
    {
        email:{
            type: String,
            required: [true,"please enter a email"],
            unique:[true,"Email is already in use"]
        },
        password:{
            type: String,
            required: [true,"please enter a password"]
        }
    },
    {
        timestamps: true,
    }
)

module.exports=mongoose.model("Admin",adminSchema);