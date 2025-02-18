const mongoose = require('mongoose');


const eventSchema = mongoose.Schema({
    club_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
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
    drive: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    }
});

// Middleware to set clubname before saving
// eventSchema.pre('save', async function (next) {
//     const event = this;
//     if (event.isModified('club_id')) {
//         const club = await mongoose.model('Club').findById(event.club_id);
//         if (club) {
//             event.club_id = club._id;
//         } else {
//             throw new Error('Club not found');
//         }
//     }
//     next();
// });

module.exports = mongoose.model("Event", eventSchema);