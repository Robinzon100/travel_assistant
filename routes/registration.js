const express = require('express');
const router = express.Router();


// ─── CONTROLERS ──────────────────────────────────────────────────────────────────
const registrationsConntrlers = require('../controllers/registration');

router.get("/signlogin", registrationsConntrlers.getRegistration);
router.post("/signlogin", registrationsConntrlers.postRegistration);


module.exports = router;