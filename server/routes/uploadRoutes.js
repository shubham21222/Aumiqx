const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../s3'); // Import S3 instance
const router = express.Router();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'mynodejs-bucket12341', // Change to your actual bucket name
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

// Upload endpoint
router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ fileUrl: req.file.location });
});

module.exports = router;
