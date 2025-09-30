const express = require('express');
const { createUsers } = require('../controllers/userController');

const routerAPI = express.Router();

// Định nghĩa route GET /
routerAPI.get("/", (req, res) => {
  return res.status(200).json("Hello world API");
});

//định nghĩa route post
routerAPI.post("/register",createUsers);

module.exports = routerAPI; //export default