const express = require("express");

const router = express.Router();
const { authenticated } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadimage");
const { pass } = require("../middlewares/passdata");

const { register, login, checkAuth } = require("../controllers/auth");
const {
	getDetailUser,
	updateUser,
	deleteUser,
} = require("../controllers/user");

const {
	handleUpload,
	getEvents,
	getDetailEvent,
	getMyEvents,
	createEvent,
	updateEvent,
	deleteEvent,
} = require("../controllers/event");

// Auth
router.post("/login", login);
router.post("/register", register);
router.get("/check-auth", authenticated, checkAuth);
router.get("/user", authenticated, getDetailUser);
router.patch("/user/edit", authenticated, updateUser);
router.delete("/user", authenticated, deleteUser);

//event
router.get("/events", authenticated, getEvents);
router.get("/event/:id", authenticated, getDetailEvent);
router.get("/event", authenticated, getMyEvents);
router.post("/event", authenticated, createEvent);
router.patch("/event/:id", authenticated, updateEvent);
router.delete("/event/:id", authenticated, deleteEvent);

// image
router.post("/upload", uploadFile("imageFile"), handleUpload);
module.exports = router;
