const multer = require("multer");
// Middleware file management

// Create a dictionary of MIME types 
const mimeTypes = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    // replace any spaces in a name with underscores  
    const name = file.originalname.split(" ").join("_"); 
    // manage the file extension
    const extension = mimeTypes[file.mimetype]; 
    // manage the full name of the file
    callback(null, `${name + Date.now()}.${extension}`);
  },
});

module.exports = multer({ storage }).single("image");