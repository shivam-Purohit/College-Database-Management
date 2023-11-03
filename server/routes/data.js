const express = require("express")

const router = express.Router();
const {
    getHomePage,
    getAboutPage
} = require('../controllers/page');

router.route('', Auth)


module.exports = router;