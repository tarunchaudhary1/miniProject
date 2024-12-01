const router = require("express").Router();
const { compResult, validate } = require("../models/compResult");
const bcrypt = require("bcrypt");

router.get('/', async(req,res) => {
    try{
        const obj = await compResult.find();
		if (!obj) {
            res.json({
                status: "FAILED",
                message: "Not founds record"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: obj
            })
        }
    }catch(err){
        res.send('Error ' + err);
    }
})

router.get('/:id', async(req,res) => {
    try{
        const _id = req.params.id;
		const obj = await compResult.findById(_id);
        if (!obj) {
            res.json({
                status: "FAILED",
                message: "Not found record"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Record found",
                data: obj
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

        console.log("New Result", req.body);
		const obj = await new compResult(req.body).save();
        console.log("Result", obj);
		
		if (!obj) {
     	   res.json({
     			status: "FAILED",
      			message: "Result addition failed!"
      	  })
 		}
    	else {
     	   res.json({
      			status: "SUCCESS",
       		    message: "Result addition successful!",
       			data: obj
        	})
  		}
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.patch('/:id', async(req,res)=> {
    flag = 1;
    try {
		const _id = req.params.id;
		const res_obj = await compResult.findById(_id);
        
        if(req.body.username == "")
			req.body.username = res_obj.username;
		if(req.body.userid == "")
			req.body.userid = res_obj.userid;
        if(req.body.quizName == "")
			req.body.quizName = res_obj.quizName;
        if(req.body.quizid == "")
			req.body.quizid = res_obj.quizid;
        if(req.body.questionList == "")
			req.body.questionList = res_obj.questionList;
        if(req.body.attemptedAnswer == "")
			req.body.attemptedAnswer = res_obj.attemptedAnswer;
        if(req.body.totalMarks == "")
			req.body.totalMarks = res_obj.totalMarks;
        if(req.body.obtainedMarks == "")
			req.body.obtainedMarks = res_obj.obtainedMarks;
        if(req.body.percentage == "")
			req.body.percentage = res_obj.percentage;
        if(req.body.remainingAttempts == "")
			req.body.remainingAttempts = res_obj.remainingAttempts;
        
		
        const { error } = validate(req.body);

		if(error) {
			//console.log(error);
            if(error.details[0].type != "any.required")
				return res.status(400).send({ message: error.details[0].message });
			//return res.status(400).send(error);
        }
        
        //const obj = await compResult.findByIdAndUpdate(_id, { '$push': { 'compQs[0]': req.body.compQs } })

		const obj = await compResult.findByIdAndUpdate(_id, req.body, {new: true});
        if (!obj) {
            res.json({
                status: "FAILED",
                message: "Record updation failed!"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Record updated successfully!",
                data: obj
            })
        }
		
    }catch(err){
        console.log(err);
        res.send(err);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const obj = await compResult.findByIdAndDelete(_id);
        if (!obj) {
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