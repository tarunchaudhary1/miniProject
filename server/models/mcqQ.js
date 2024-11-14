const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const quesSchema = new mongoose.Schema({
	category: { type: String, required: true },
	question: { type: String, required: true },
	option1: { type: String, required: true },
	option2: { type: String, required: true },
	option3: { type: String, required: false },
	option4: { type: String, required: false },
	correct: { type: Number, required: true }
});

quesSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ id: this.id }, process.env.JWTPRIVATEKEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
	return token;
};

const mcqQ = mongoose.model("mcqQ", quesSchema, 'mcqQs');

const validate = (data) => {
	const schema = Joi.object({
		category: Joi.string().required().label("Category"),
		question: Joi.string().required().label("Question"),
		option1: Joi.string().required().label("Option 1"),
		option2: Joi.string().required().label("Option 2"),
		option3: Joi.string().label("Option 3"),
		option4: Joi.string().label("Option 4"),
		correct: Joi.number().required().label("Correct Option")
	});
	return schema.validate(data);
};

module.exports = { mcqQ, validate };