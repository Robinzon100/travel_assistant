const multer = require("multer");



//!─── CAFE PAGE IMAGES ────────────────────────────────────────────
const cafeFileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/cafe");
    },
    filename: (req, file, cb) => {
        cb(null, "(" + new Date().getTime() + ")--" + file.originalname);
    }
});

// const cpUpload = multer.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
exports.uploadCafeImages = multer({ storage: cafeFileStorage }).fields([
    { name: 'menu_item_ImageUrl', maxCount: 8 },
    { name: 'card_image', maxCount: 1 },
    { name: 'showcase_images', maxCount: 6 },
    { name: 'about_image', maxCount: 1 }
]);

