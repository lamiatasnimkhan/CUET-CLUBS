const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/SWE Lab Code Folder/project-bolt-sb1-3xdqenev/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  },
});

// Initialize upload
var upload= multer({
    storage:storage,
    fileFilter:function(req,file,callback){
        if(
            file.mimetype=="image/png"||
            file.mimetype=="image/jpg"||
            file.mimetype=="image/jpeg"
        ){
            callback(null,true)
        }else{
            console.log('only images are allowed')
            callback(null,false)
        }
    },
    limits:{
        fileSize:1024*1024*2
    }
})

module.exports = upload;
