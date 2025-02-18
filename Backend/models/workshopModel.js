const mongoose = require('mongoose');

// Define the workshop schema
const workshopSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  file: {
    type: String // This will store the file path of the uploaded image
  },
  mentors: [{
    type: String // Array of mentor names
  }],
  videoLinks: [{
    type: String // Array of video links
  }],
  club_id: {
    type: String,
    required: true
  }
});

// Middleware to set clubname before saving
// workshopSchema.pre('save', async function (next) {
//   const workshop = this;
//   if (workshop.isModified('club_id')) {
//     const club = await mongoose.model('Club').findById(workshop.club_id);
//     if (club) {
//       workshop.clubname = club.clubname;
//     } else {
//       throw new Error('Club not found');
//     }
//   }
//   next();
// });

module.exports = mongoose.model("Workshop", workshopSchema);
