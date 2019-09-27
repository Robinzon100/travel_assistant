const multer = require("multer");
const fs = require('fs');

//!─── CAFE PAGE IMAGES ────────────────────────────────────────────
let routerCall = 0;

if (routerCall > 0) {
    routerCall = 0;
}


// uploadCafeImages(req, res, err => {
//     if (err) {
//         if (err.code === 'LIMIT_FILE_SIZE') {
//             console.log("THE FILE IS TOO LARGE")
//         } else {
//             var result = {
//                 'status': 'Fail',
//                 'error': err
//             };
//             res.end(result);
//         }
//     }
// })


const storage = multer.diskStorage({
    //? FILE DESTINATION
    destination: async (req, file, cb) => {
        let body = await req.body;
        const dir = `images/${body.typeOfPost}/${body.establishment_name}`;

        if (fs.existsSync(dir)) {
            cb(null, dir);
        } else {
            fs.mkdirSync(dir, err => cb(err, dir))
            cb(null, dir);
        }

       
    },

    // // //? ON ERROR
    // onError: async (req, file, cb) => {
    //     req.flash('error', 'file must be no more than 30KB and JPEG or PNG')
    //     next();
    // },
    

    //? FILE NAME
    filename: async (req, file, cb) => {
        let body = await req.body;
        cb(null, "(" + new Date().getTime() + ")--" + body.establishment_name + file.originalname);
    }
});





const maxSize = 800000;

const options = {
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        sanitizeFile(req, file, cb);
    }
}


exports.uploadCafeImages = multer(options).fields([
    { name: "menu_item_ImageUrl", maxCount: 8 },
    { name: "card_image", maxCount: 1 },
    { name: "showcase_images", maxCount: 6 },
    { name: "about_image", maxCount: 1 }
]);











const sanitizeFile = (req, file, cb) => {
    // Define the allowed extension
    let fileExts = ['png', 'jpg', 'jpeg']
    // Check allowed extensions
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    // Mime type must be an image
    let isAllowedMimeType = file.mimetype.startsWith("image/")
    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true) // no errors
    }
    else {
        // pass error msg to callback, which can be displaye in frontend
        
        cb(console.log('Error: File type not allowed!'))
    }
}




// exports.imageErrorHandler = (req, res) => {
//     this.uploadCafeImages(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             res.send('this' + err.message + "=====> " + err.field)
//         } else if (err) {

//         }
//     })
// }






//var rimraf = require("rimraf");

// exports.getPostCategoryName = async(req, res, next) => {
//     let typeOfPost = await req.body;
//     return  typeOfPost;
// };

// const getLocationLink = (locationLink) => {
//     return parsedLocationLink = locationLink
//         .split(" ")[1]
//         .slice(4)
//         .replace(/['"]+/g, "");
// }

// const emptyDir = (dir) =>{
//     fs.readdir(dir, (err, files) => {
//         if (err) throw err;

//         for (const file of files) {
//             fs.unlink(path.join(dir, file), err => {
//                 if (err) throw err;
//             });
//         }
//     });
// }




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