const multer = require("multer");
const fs = require('fs');

// exports.getPostCategoryName = async(req, res, next) => {
//     let typeOfPost = await req.body;
//     return  typeOfPost;
// };

//!─── CAFE PAGE IMAGES ────────────────────────────────────────────
let uploadTime = 0;
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let body = await req.body;
        
        const dir = `images/${body.typeOfPost}/${body.establishment_name}`;
        if (uploadTime == 0) {
            fs.mkdirSync(dir);
        }
        // const establishmentDir = 
        
        uploadTime++;
        cb(null, dir); 
    },
    filename: async (req, file, cb) => {
        let body = await req.body;
        cb(null, "(" + new Date().getTime() + ")--" + body.establishment_name + file.originalname);
    }
});

// const cpUpload = multer.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
exports.uploadCafeImages = multer({ storage: storage }).fields([
    { name: "menu_item_ImageUrl", maxCount: 8 },
    { name: "card_image", maxCount: 1 },
    { name: "showcase_images", maxCount: 6 },
    { name: "about_image", maxCount: 1 }
]);
