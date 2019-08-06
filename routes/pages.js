const express = require('express');
const app = express();
const router = express.Router();


// ─── CONTROLERS ──────────────────────────────────────────────────────────────────
const pageControllers = require('../controllers/posts');

//! ─── LANDING PAGE ───────────────────────────────────────────────────────────────
router.get('/', pageControllers.getLanding);

//
//! ─── EXPLORE PAGE ───────────────────────────────────────────────────────────────
//  
router.get('/explore', pageControllers.getTours);
router.post('/explore', pageControllers.postTourToBookmark);
router.get('/explore/:singlePostId', pageControllers.getPost);

// // !─── CAFE ───────────────────────────────────────────────────────────────────
// router.get('/search', pageControllers.getSearch);
// router.post('/search', pageControllers.getSearch);


// !─── SEARCH ───────────────────────────────────────────────────────────────────
router.get('/search', pageControllers.getSearch);
// router.post('/search', pageControllers.getSearch);


module.exports = router;