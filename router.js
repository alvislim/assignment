const express = require('express');
const router = express.Router();

const commonStudents = require('./controllers/commonStudents');
const register = require('./controllers/register');
const suspend = require('./controllers/suspend');
const notification = require('./controllers/notification');

router.use('/', commonStudents);
router.use('/', register);
router.use('/', suspend);
router.use('/', notification);

module.exports = router;