const { Event, Participant, User } = require("../../models/");
const Joi = require("joi");
const URL = process.env.URL;

exports.getEvents = async (req, res) => {
	try {
		const events = await Event.findAll({
			include: [
				{
					model: User,
					as: "participant",
					attributes: {
						exclude: ["createdAt", "updatedAt", "participants"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
			order: [["date", "DESC"]],
		});

		res.send({
			status: "success",
			message: "Events Succesfully Get",
			data: {
				events,
				url: URL,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};

exports.getByEvents = async (req, res) => {
	try {
		const events = await Event.findAll({
			where: {
				createdBy: req.userId.id,
			},
			include: [
				{
					model: Participant,
					as: "participants",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
			order: [["date", "DESC"]],
		});
		res.send({
			status: "success",
			message: "events Succesfully Get",
			data: {
				events,
				url: URL,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};
exports.getDetailEvent = async (req, res) => {
	try {
		const { id } = req.params;
		const event = await Event.findOne({
			where: {
				id,
			},
			include: [
				{
					model: Participant,
					as: "participants",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
		res.send({
			status: "success",
			message: "Event Succesfully Get",
			data: {
				event,
				url: URL,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};

exports.getMyEvents = async (req, res) => {
	try {
		const events = await Participant.findAll({
			where: {
				userId: req.userId.id,
			},
			include: [
				{
					model: Event,
					as: "events",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
			order: [["date", "DESC"]],
		});

		res.send({
			status: "success",
			message: "Events Succesfully Get",
			data: {
				events,
				url: URL,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};

exports.createEvent = async (req, res) => {
	try {
		const { body } = req;

		const schema = Joi.object({
			title: Joi.string().required(),
			location: Joi.string().required(),
			participants: Joi.required(),
			date: Joi.required(),
			note: Joi.required(),
			image: Joi.required(),
		});
		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				status: "validation failed",
				message: error.details[0].message,
			});

		const eventCreate = await Event.create({
			createdBy: req.userId.id,
			title: body.title,
			location: body.description,
			date: body.date,
			note: body.note,
			image: body.image,
		});

		const { participants } = body;

		for (let i = 0; i < participants.length; i++) {
			console.log("ok");
			await Participant.create({
				eventId: eventCreate.id,
				userId: participants[i].userId,
			});
		}

		const event = await Event.findOne({
			where: {
				id: eventCreate.id,
			},
			include: [
				{
					model: User,
					// as: "participants",
					attributes: {
						exclude: ["createdAt", "updatedAt", "pparticipants", "password"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});

		console.log(event);
		res.send({
			status: "success",
			message: "Success Add New Event",
			data: {
				event,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};

exports.updateEvent = async (req, res) => {
	try {
		const { id } = req.params;
		const { body } = req;

		const eventUpdate = await Event.findOne({
			where: {
				id,
			},
		});

		if (!eventUpdate) {
			return res.status(400).send({
				status: "error",
				message: "Event doesn't exist",
			});
		}
		eventUpdate.title = body.title;
		eventUpdate.note = body.note;
		eventUpdate.location = body.location;
		eventUpdate.date = body.date;
		if (body.image == undefined) {
		} else {
			eventUpdate.image = body.image;
		}
		await eventUpdate.save();

		await Participant.destroy({
			where: {
				eventId: id,
			},
		});

		const { participants } = body;

		for (let i = 0; i < participants.length; i++) {
			await Participant.create({
				eventId: eventCreate.id,
				userId: events[i].userId,
			});
		}

		const event = await Event.findOne({
			where: {
				id,
			},
		});
		res.send({
			status: "success",
			message: " Succesfully Updated",
			data: {
				event,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};
exports.deleteEvent = async (req, res) => {
	try {
		const { id } = req.params;
		const event = await Event.findOne({
			where: {
				id,
			},
		});

		if (!event) {
			return res.status(400).send({
				status: "error",
				message: "Event not exist",
			});
		}

		await event.destroy();

		res.send({
			status: "success",
			message: "Event Successfully Delete",
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};

exports.handleUpload = async (req, res) => {
	try {
		console.log("req-body", req.body);
		console.log("req-file", req.files);
		let imageName = null;
		if (!req.body.imageFile) {
			imageName = req.files.imageFile[0].filename;
		}

		res.send({
			status: "success",
			message: "Success upload Image",
			data: {
				imageName,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};
