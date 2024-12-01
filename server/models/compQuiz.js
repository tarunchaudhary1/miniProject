const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const quizSchema = new mongoose.Schema({
	name: { type: String, required: true },
	desc: { type: String, required: true },
	maxAttempt: { type: Number, default: 1, required: true },
    minPerc: { type: Number, min: 1, max: 100, required: true },
    correctScore: { type: Number, min: 1, max: 100, required: true },
    incorrectScore: { type: Number, min: 0, max: 100, required: true },
    duration: { type: Number, min: 10, max: 180, required: true },
	compQs: { type: Array, required: false},
	addcompQs: { type: Object, required: false },
	delcompQs: {type: Object, required: false },
	users: { type: Array, required: false },
	addUsers: { type: Object, required: false },
	delUsers: { type: Object, required: false },
	attempted: { type: Array, default: [], required: true },
	expiryTime: { type: Date, required: true },
	expired: { type: Boolean, default: false, required: true }
});

quizSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ id: this.id }, "miniproject", {
		expiresIn: "1d",
	});
	return token;
};

const compQuiz = mongoose.model("compQuiz", quizSchema, 'compQuizzes');

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		desc: Joi.string().required().label("Description"),
		maxAttempt: Joi.number().label("Maximum Attempts"),
        minPerc: Joi.number().required().label("Minimum Percentage"),
        correctScore: Joi.number().required().label("Correct Score"),
        incorrectScore: Joi.number().required().label("Incorrect Score"),
        duration: Joi.number().required().label("Duration"),
		compQs: Joi.array().label("Comprehensive Questions"),
		addcompQs: Joi.string().label("Add Comp Questions"),
		delcompQs: Joi.string().label("Delete Comp Questions"),
		users: Joi.array().label("Users"),
		addUsers: Joi.string().label("Add Users"),
		delUsers: Joi.string().label("Delete Users"),
		attempted: Joi.boolean().label("Attempted"),
		expiryTime: Joi.date().required().label("Expiry Time"),
		expired: Joi.boolean().label("Expired")
	});
	return schema.validate(data);
};

module.exports = { compQuiz, validate };