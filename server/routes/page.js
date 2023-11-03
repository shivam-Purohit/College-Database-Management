const express = require("express")

const router = express.Router();
const {
    getHomePage,
    getAboutPage
} = require('../controllers/page');

router.route('', getHomePage)
router.route('/about', getAboutPage)

module.exports = router;