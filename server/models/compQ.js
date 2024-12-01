const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const quesSchema = new mongoose.Schema({
	category: { type: String, required: true },
	question: { type: String, required: true },
	answer: { type: String, required: true }
});

quesSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ id: this.id }, "miniproject", {
		expiresIn: "1d",
	});
	return token;
};

const compQ = mongoose.model("compQ", quesSchema, 'compQs');

const validate = (data) => {
	const schema = Joi.object({
		category: Joi.string().required().label("Category"),
		question: Joi.string().required().label("Question"),
		answer: Joi.string().required().label("Answer")
	});
	return schema.validate(data);
};

module.exports = { compQ, validate };