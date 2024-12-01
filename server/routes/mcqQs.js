
require("dotenv").config();
const router = require("express").Router();
const { mcqQ, validate } = require("../Models/mcqQ");
const bcrypt = require("bcrypt");

router.get('/', async(req,res) => {
    try{
        const result = await mcqQ.find();
		if (!result) {
            res.json({
                status: "FAILED",
                message: "Not founds record"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: result
            })
        }
    }catch(err){
        res.send('Error ' + err);
    }
})

router.get('/:id', async(req,res) => {
    try{
        const _id = req.params.id;
		const result = await mcqQ.findById(_id);
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Not found record"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Record found",
                data: result
            })
        }
    }catch(err){
        res.send('Error ' + err);
    }
})

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const result = await new mcqQ(req.body).save();
		
		if (!result) {
     	   res.json({
     			status: "FAILED",
      			message: "Question addition failed!"
      	  })
 		}
    	else {
     	   res.json({
      			status: "SUCCESS",
       		    message: "Question addition successful!",
       			data: result
        	})
  		}
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// router.put("/:id", async (req, res) => {
// 	try{
// 		const _id = req.params.id;
// 		var emailFlag = 0;
// 		const user = await User.findById(_id);
// 		if(req.body.firstName == "")
// 			req.body.firstName = user.firstName;
// 		if(req.body.lastName == "")
// 			req.body.lastName = user.lastName;
// 		if(req.body.email == "") {
// 			emailFlag = 1;
// 			req.body.email = user.email;
// 		}
// 		console.log(emailFlag)
// 		const { error } = validate(req.body);

// 		if(error)
// 			console.log(error);
// 			if(error.details[0].type != "any.required")
// 				return res.status(400).send({ message: error.details[0].message });
// 				//return res.status(400).send(error);

// 		const userCheck = await User.findOne({ email: req.body.email });
// 		if (userCheck && emailFlag == 0)
// 			return res
// 				.status(409)
// 				.send({ message: "User with given email already exists!" });

// 		const result = await User.findByIdAndUpdate(_id,req.body,{new: true});
//         console.log(result)
//         if (!result) {
//             res.json({
//                 status: "FAILED",
//                 message: "Records not Update....",
//                 data: result
//             })
//         }
//         else {
//             res.json({
//                 status: "SUCCESS",
//                 message: "Record is Updated successfully...",
//                 data: result
//             })
//         }
		
// 		// if(password) {
// 		// 	const salt = await bcrypt.genSalt(Number("1d"));
// 		// 	const hashPassword = await bcrypt.hash(req.body.password, salt);
// 		// 	user.password = hashPassword;
// 		// }

// 		// PASSWORD TO BE UPDATED BY SENDING A LINK TO USER'S EMAIL, NOT IN THE EDIT DETAILS PAGE

//         // const upd = await user.save();
//         // res.json(upd);
//     }catch(err){
//         res.send(err);
//     }
// })

router.patch('/:id', async(req,res)=> {
    try{
        console.log(req.params.id)
		const _id = req.params.id;
		const question = await mcqQ.findById(_id);
        if(req.body.category == "")
			req.body.category = question.category;
		if(req.body.question == "")
			req.body.question = question.question;
		if(req.body.option1 == "")
			req.body.option1 = question.option1;
        if(req.body.option2 == "")
			req.body.option2 = question.option2;
        if(req.body.option3 == "")
			req.body.option3 = question.option3;
            // mcqQ.updateOne( { _id: _id },
            //                 { option3: "100" } );
        if(req.body.option4 == "")
			req.body.option4 = question.option4;
        if(req.body.correct == "")
			req.body.correct = question.correct;
		
        const { error } = validate(req.body);

		if(error) {
			//console.log(error);
            if(error.details[0].type != "any.required") {
				return res.status(400).send({ message: error.details[0].message });
            }
			//return res.status(400).send(error);
        }

		const result = await mcqQ.findByIdAndUpdate(_id,req.body,{new: true});
        console.log(result)
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Record not updated",
                data: result
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Record updated successfully!",
                data: result
            })
        }
        
    }catch(err){
        res.send(err);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await mcqQ.findByIdAndDelete(_id);
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Record not deleted"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Record deleted successfully!"
            })
        }
    }
    catch (e) {
        res.send(e)
    }
})

module.exports = router;