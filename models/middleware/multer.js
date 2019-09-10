const multer = require("multer");
const fs = require('fs');

// exports.getPostCategoryName = async(req, res, next) => {
//     let typeOfPost = await req.body;
//     return  typeOfPost;
// };

//!─── CAFE PAGE IMAGES ────────────────────────────────────────────
let routerCall = 0;
const storage = multer.diskStorage({
    //? FILE DESTINATION
    destination: async (req, file, cb) => {
        let body = await req.body;
        const dir = `images/${body.typeOfPost}/${body.establishment_name}`;

        if (routerCall == 0) {
            checkDirectory()
            fs.mkdirSync(dir);
        }

        routerCall++;
        cb(null, dir);
    },

    //? ON ERROR
    onError: async (req, file, cb) => {
        req.flash('error', 'file must be no more than 30KB and JPEG or PNG')
        next();
    },

    //? FILE NAME
    filename: async (req, file, cb) => {
        let body = await req.body;
        cb(null, "(" + new Date().getTime() + ")--" + body.establishment_name + file.originalname);
    }
});




// const cpUpload = multer.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])


const maxSize = 3000000;

const options = {
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            console.log('Only .png, .jpg and .jpeg format allowed!');
            cb(null, false);
        }
    }
}


exports.uploadCafeImages = multer(options).fields([
    { name: "menu_item_ImageUrl", maxCount: 8 },
    { name: "card_image", maxCount: 1 },
    { name: "showcase_images", maxCount: 6 },
    { name: "about_image", maxCount: 1 }
]);



exports.imageErrorHandler = (req, res) => {
    this.uploadCafeImages(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log('this' + err.message + "=====> " + err.field)
        } else if (err) {
            // An unknown error occurred when uploading.
        }

        // Everything went fine.
    })
}










// //function will check if a directory exists, and create it if it doesn't
// function checkDirectory(directory, callback) {
//     fs.stat(directory, function (err, stats) {
//         //Check if error defined and the error code is "not exists"
//         if (err && err.errno === 34) {
//             //Create the directory, call the callback.
//             fs.mkdir(directory, callback);
//         } else {
//             //just in case there was a different error:
//             callback(err)
//         }
//     });
// }



// checkDirectory("./logs/", function(error) {  
//     if(error) {
//       console.log("oh no!!!", error);
//     } else {
//       //Carry on, all good, directory exists / created.
//     }
//   });



// fs.readdir(directory, (err, files) => {
//     if (err) throw err;
  
//     for (const file of files) {
//       fs.unlink(path.join(directory, file), err => {
//         if (err) throw err;
//       });
//     }
//   });