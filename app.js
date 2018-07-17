const express = require('express');
const multer = require('multer');

const app = express();
const fs = require('fs');

const path = require('path');

const UPLOAD_DIR = path.join(__dirname, 'public', 'uploads');
const PORT = process.env.PORT || 3000;
const uploaded_files = [];

app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.json());

const upload = multer({dest: UPLOAD_DIR});

app.post('/upload', upload.single('myFile'), function (req, res) {
    res.render('success', { image: req.file });
    });

app.get('/', function(req, res) {
    const path = './public/uploads';
    fs.readdir(UPLOAD_DIR, (err, items) => {
        res.render('index', {images: items});
    });
});

app.post('/latest', (req, res) => {
    fs.readdir(UPLOAD_DIR, (err, images) => {
        const newImages = [];
        let timestamp = req.body.after;

        images.forEach(image => {
            const imagePath = path.join(UPLOAD_DIR, image);
            const modified = fs.statSync(imagePath).mtimeMs;

            if(modified > req.body.after) {
                if (modified > timestamp) {
                    timestamp = modified
                } 
                newImages.push(image);
            }
        });

        res.send({
            images: newImages,
            timestamp
        });
    });
});



app.listen(PORT, () => {
    console.log(`Server now running on http://localhost:${PORT}`)
});