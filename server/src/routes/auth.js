const express = require('express');
//D:\ngon-master\server\src\model\user.js shortcut
const { isAuthenticated } = require('D:\\ngon-master\\server\\src\\middleware\\Authmiddleware.js');
const router = express.Router();
const { register, login, logout, patchUpdate } = require('D:\\ngon-master\\server\\src\\controller\\authController.js');
router.get("/auth-endpoint", isAuthenticated, (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });
  
router.post('/sign-up', register);
router.post('/login', login); 
router.post('/logout', logout);
router.patch("/u/:field", isAuthenticated, patchUpdate);

module.exports = router;

