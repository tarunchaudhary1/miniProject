const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const adminSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	contactNo: { type: String, required: true},
	email: { type: String, required: true },
	password: { type: String, required: true }
});

adminSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ id: this.id }, process.env.JWTPRIVATEKEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
	return token;
};

const Admin = mongoose.model("admin", adminSchema, 'admins');

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		contactNo: Joi.string().required().label("Contact Number"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password")
	});
	return schema.validate(data);
};

module.exports = { Admin, validate };