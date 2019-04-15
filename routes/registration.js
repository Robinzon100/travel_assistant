const express = require('express');
const router = express.Router();


// ─── CONTROLERS ──────────────────────────────────────────────────────────────────
const registrationsConntrlers = require('../controllers/registration');

router.get("/register", registrationsConntrlers.getRegistration);
router.post("/register", registrationsConntrlers.postRegistration);


module.exports = router;