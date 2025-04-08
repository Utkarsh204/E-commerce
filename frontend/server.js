const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 4000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Save images in the 'public/images' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, `product_${uniqueSuffix}`);
    },
});

const upload = multer({ storage });

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API endpoint to handle form-data
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }

    const imageUrl = `http://localhost:${PORT}/images/${req.file.filename}`;
    res.json({
        success: 1,
        image_url: imageUrl,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
