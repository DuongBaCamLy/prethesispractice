const express = require('express');
const { createUsers, handleLogin, getUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

const routerAPI = express.Router();

// ===== Public routes (không cần token) =====
routerAPI.get('/', (req, res) => {
  return res.status(200).json('Hello world API');
});

routerAPI.post('/register', createUsers);
routerAPI.post('/login', handleLogin);

// ===== Protected routes (cần token) =====
routerAPI.use(auth);         // <-- từ đây trở xuống mới cần token
routerAPI.get('/user', getUser);

module.exports = routerAPI;
