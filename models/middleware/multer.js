const multer = require("../../multer");
// ─── FILE STORAGE OPTIONS FOR MULTER ────────────────────────────────────────────
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, "(" + new Date().getTime() + ")--" + file.originalname);
    }
});

// const cpUpload = multer.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
const upload = multer({ storage: fileStorage }).fields([
    { name: 'menu_item_ImageUrl', maxCount: 1 },
    { name: 'card_image', maxCount: 1 },
    { name: 'showcase_images', maxCount: 6 },
    { name: 'about_image', maxCount: 1 },
    { name: 'slider_images', maxCount: 20 },
    { name: 'profile_image', maxCount: 1 }
]);



module.exports = {
    fileStorage,
    upload
}