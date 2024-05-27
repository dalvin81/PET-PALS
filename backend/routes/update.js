const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const login = require('../middleware/login');
const multer = require('multer')
const INFO = mongoose.model("INFO");
const { uploadFile, deleteFile, getObjectSignedUrl } = require('./s3');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.get('/get-profile',login, async (req, res) => {
    try {
        const profile = await INFO.findOne({ user: req.user });
        
        if(!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        const photoUrl = profile.photo

        const profileData = {
            petName: profile.petName,
            about: profile.about,
            photoUrl: photoUrl
        };

        res.json(profileData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/update-profile', login, upload.single('image'), async (req, res) => {
    try {
        console.log(req)
        const image = req.file;
        const petname = req.body.petname;
        const about = req.body.about;
        console.log(image, petname, about)

        if (!image || !petname || !about) {
            return res.status(422).json({ error: "Something is missing" });
        }

        const fileName = image.originalname; 
        const fileBuffer = image.buffer;
        const mimeType = image.mimetype;

        // Upload image to S3
        const uploadResponse = await uploadFile(fileBuffer, fileName, mimeType);
        const imageUrl = await getObjectSignedUrl(fileName);

        // Save information to MongoDB
        const info = new INFO({
            photo: imageUrl,
            petName: petname,
            about: about,
            user: req.user
        });

        const savedInfo = await info.save();

        res.json({ post: savedInfo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
