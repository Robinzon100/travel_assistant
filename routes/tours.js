const express = require('express');
const app = express();
const router = express.Router();


// ─── CONTROLERS ──────────────────────────────────────────────────────────────────
const toursControllers = require('../controllers/tours');


router.get('/', toursControllers.getLanding);
router.get('/explore', toursControllers.getTours); 
router.get('/explore/:singleTourId', toursControllers.getTour); 

router.get('/search', toursControllers.getSearch);


module.exports = router;