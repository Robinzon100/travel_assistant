const express = require('express');
const app = express();
const router = express.Router();

// ─── CONTROLERS ──────────────────────────────────────────────────────────────────
const adminControllers = require('../controllers/admin');

//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
//
// const isAuth = require('../models/middleware/is-auth');

router.get("/add-tour",adminControllers.getAddTour);
router.post("/add-tour", adminControllers.postAddTour);


module.exports = router;