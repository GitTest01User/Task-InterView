const express = require('express');
const { LoginUserController, UserControllerlogout } = require('../controllers/LoginController');
const authMiddleware = require('../middleware/middleware');
const router = express.Router();

router.post('/users/login', LoginUserController);
router.post('/users/logout', authMiddleware, UserControllerlogout);

module.exports = router;
