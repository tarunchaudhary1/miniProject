const router = require("express").Router();
const { Admin } = require("../Models/admin");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    console.log("first1");
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    console.log("first2");

    const admin = await Admin.findOne({ email: req.body.email });
    console.log("first3");

    if (!admin) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }
    console.log("first4");

    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    console.log("first5");

    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });
    console.log("first6");

    const token = admin.generateAuthToken();
    console.log("here");
    res.status(200).send({
      data: token,
      userInfo: admin,
      message: "logged in successfully",
    });
    console.log("first7");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
