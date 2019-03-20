const express = require('express');
const app = express();
const router = express.Router();


// ─── CONTROLERS ──────────────────────────────────────────────────────────────────
const toursControllers = require('../controllers/tours');


router.get('/', toursControllers.getLanding);
router.get('/tours', toursControllers.getTours);
router.post('/tours', toursControllers.postTours);


module.exports = router;