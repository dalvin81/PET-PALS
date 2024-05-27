const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const login = require('../middleware/login');
const POST = mongoose.model("POST")
const multer = require('multer')
const { uploadFile, deleteFile, getObjectSignedUrl } = require('./s3');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// fetching posts from DB
router.get('/posts', login, async (req, res) => {
    try {
        const posts = await POST.find().populate("postedBy", "_id name");
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/create', login, upload.single('image'), async (req, res) => {
    try {
        const image = req.file
        const { body } = req.body;

        if (!body || !image) {
            return res.status(422).json({ error: "Please add all fields" });
        }

        const fileName = image.originalname;
        const fileBuffer = image.buffer;
        const mimeType = image.mimetype;

        const uploadResponse = await uploadFile(fileBuffer, fileName, mimeType);
        const imageUrl = await getObjectSignedUrl(fileName);

        const post = new POST({
            body,
            photo: imageUrl,
            postedBy: req.user
        });

        const savedPost = await post.save();

        res.json({ post: savedPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router