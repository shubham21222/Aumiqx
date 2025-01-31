const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const router = express.Router();

// Configure AWS SDK
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// console.log(process.env.AWS_ACCESS_KEY_ID);

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory

// Upload image to S3
const uploadToS3 = (file) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${Date.now()}-${file.originalname}`, // Unique file name
        Body: file.buffer, // File data
        ContentType: file.mimetype, // File type
        ACL: "public-read", // Make the file publicly accessible
    };

    return s3.upload(params).promise();
};

// Upload route
router.post("/", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const s3Response = await uploadToS3(req.file);
        res.status(200).json({ imageUrl: s3Response.Location }); // Return S3 public URL
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading file", error });
    }
});

module.exports = router;