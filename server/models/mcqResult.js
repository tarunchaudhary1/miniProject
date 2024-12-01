const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const resultSchema = new mongoose.Schema({
	username: { type: String, required: true },
	userid: { type: String, required: true },
	quizName: { type: String, required: true },
    quizid: { type: String, required: true },
    totalMarks: { type: Number, required: true },
    obtainedMarks: { type: Number, required: true },
    percentage: { type: Number, required: true },
	pass: { type: Boolean, required: false },
	remainingAttempts: { type: Number, required: true }
});

resultSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ id: this.id }, "miniproject", {
		expiresIn: "1d",
	});
	return token;
};

const mcqResult = mongoose.model("mcqResult", resultSchema, 'mcqResults');

const validate = (data) => {
	const schema = Joi.object({
		username: Joi.string().required().label("User Name"),
		userid: Joi.string().required().label("User ID"),
		quizName: Joi.string().required().label("Quiz Name"),
        quizid: Joi.string().required().label("Quiz ID"),
        totalMarks: Joi.number().required().label("Total Marks"),
        obtainedMarks: Joi.number().required().label("Obtained Marks"),
        percentage: Joi.number().required().label("Percentage"),
		pass: Joi.boolean().label("Pass"),
		remainingAttempts: Joi.number().required().label("Remaining Attempts")
	});
	return schema.validate(data);
};

module.exports = { mcqResult, validate };