const mongoose = require('mongoose');


const committeeSchema = mongoose.Schema({
    club_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    file: {
        type: String, // This will store the file path of the uploaded image
    },
    facebook: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    instagram: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    linkedin: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    email:{
        type: String,
        required: [true,"please enter a email"]
    }
});

// Middleware to set clubname before saving
// committeeSchema.pre('save', async function (next) {
//     const committee = this;
//     if (committee.isModified('club_id')) {
//         const club = await mongoose.model('Club').findById(committee.club_id);
//         if (club) {
//             committee.clubname = club.clubname;
//         } else {
//             throw new Error('Club not found');
//         }
//     }
//     next();
// });

module.exports = mongoose.model("committee", committeeSchema);