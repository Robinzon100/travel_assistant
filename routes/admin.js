const express = require('express');
const app = express();
const router = express.Router();
const { check, body } = require("express-validator/check");


// ─── CONTROLERS ──────────────────────────────────────────────────────────────────
const adminControllers = require('../controllers/admin');

//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
//
const isAuth = require('../models/middleware/is-auth');
const multer = require('../models/middleware/multer');
const validate = require('../models/middleware/validators');


router.get("/add-tour", isAuth.adminAuth, adminControllers.getAddTour);
router.post("/add-tour", isAuth.adminAuth, adminControllers.postAddTour);




router.get('/add-cafe', adminControllers.getAddCafe);
router.post('/add-cafe',  
            validate.cafeBody,
            multer.uploadCafeImages,
            adminControllers.postAddCafe);


router.get('/add-shop', adminControllers.getAddShop);
router.post('/add-shop', adminControllers.postAddShop);


module.exports = router;





 