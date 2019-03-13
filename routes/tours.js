const express = require('express');
const app = express();
const router = express.Router();

//
// ─── CONTROLERS ──────────────────────────────────────────────────────────────────
//
const toursControllers = require('../controllers/tours');


router.get('/', toursControllers.getLanding);


module.exports = router;