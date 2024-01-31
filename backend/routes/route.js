const express = require("express");
const router = express.Router();
const {signup,login} = require("../controllers/register");
const authorizeToken = require("../middlewares/auth");
const {createTask} = require("../controllers/tasks");

router.post("/register",signup);
router.post("/login",login);
router.post("/create-todo", authorizeToken,createTask);

module.exports = router;