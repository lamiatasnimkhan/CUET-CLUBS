const mongoose = require('mongoose');

const clubSchema = mongoose.Schema(
    {
        clubname:{
            type: String,
            required: [true,"please enter a username"],
            unique:[true,"Clubname is already in use"]
        },
        email:{
            type: String,
            required: [true,"please enter a email"],
            unique:[true,"Email is already in use"]
        },
        password:{
            type: String,
            required: [true,"please enter a password"]
        },
        about:{
            type: String
        },
        file: {
            type: String, // This will store the file path of the uploaded image
        },
        phone_number:{
            type: String,
            //required: [true,"please enter a email"]
        },
        mailing_address:{
            type: String,
        //required: true,
        validate: {
            validator: function (v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
        }
    },
    {
        timestamps: true,
    }
)

module.exports=mongoose.model("Club",clubSchema);