const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const resultSchema = new mongoose.Schema({
	username: { type: String, required: true },
	userid: { type: String, required: true },
	quizName: { type: String, required: true },
	quizid: { type: String, required: true },
	questionList: { type: Array, required: true },
	attemptedAnswer: { type: Object, required: true },
	totalMarks: { type: Number, required: true },
	obtainedMarks: { type: Object, required: false },
	percentage: { type: Number, required: false },
	pass: { type: Boolean, required: false },
	remainingAttempts: { type: Number, required: true }
});

resultSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ id: this.id }, process.env.JWTPRIVATEKEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
	return token;
};

const compResult = mongoose.model("compResult", resultSchema, 'compResults');

const validate = (data) => {
	const schema = Joi.object({
		username: Joi.string().required().label("User Name"),
		userid: Joi.string().required().label("User ID"),
		quizName: Joi.string().required().label("Quiz Name"),
		quizid: Joi.string().required().label("Quiz ID"),
		questionList: Joi.array().required().label("Questions List"),
		attemptedAnswer: Joi.object().required().label("Attempted Answers"),
		totalMarks: Joi.number().required().label("Total Marks"),
		obtainedMarks: Joi.object().label("Obtained Marks"),
		percentage: Joi.number().label("Percentage"),
		pass: Joi.boolean().label("Pass"),
		remainingAttempts: Joi.number().required().label("Remaining Attempts")
	});
	return schema.validate(data);
};

module.exports = { compResult, validate };