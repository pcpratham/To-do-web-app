const express = require("express");
const router = express.Router();
const {signup,login} = require("../controllers/register");
const authorizeToken = require("../middlewares/auth");
const {createTask,getToDo,updateToDo} = require("../controllers/tasks");

router.post("/register",signup);
router.post("/login",login);
router.post("/create-todo", authorizeToken,createTask);
router.get("/get-todo",authorizeToken,getToDo)
router.put("/update-todo",authorizeToken,updateToDo)

module.exports = router;