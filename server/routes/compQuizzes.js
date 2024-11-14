const router = require("express").Router();
const { compQuiz, validate } = require("../models/compQuiz");
const bcrypt = require("bcrypt");

router.get('/', async(req,res) => {
    try{
        const result = await compQuiz.find();
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
		const result = await compQuiz.findById(_id);
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

		const result = await new compQuiz(req.body).save();
		
		if (!result) {
     	   res.json({
     			status: "FAILED",
      			message: "Quiz addition failed!"
      	  })
 		}
    	else {
     	   res.json({
      			status: "SUCCESS",
       		    message: "Quiz addition successful!",
       			data: result
        	})
  		}
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.patch('/:id', async(req,res)=> {
    flag = 1;
    try{
		const _id = req.params.id;
		const quiz = await compQuiz.findById(_id);
        
        if(req.body.name == "")
			req.body.name = quiz.name;
		if(req.body.desc == "")
			req.body.desc = quiz.desc;
        if(req.body.maxAttempt == "")
			req.body.maxAttempt = quiz.maxAttempt;
        if(req.body.minPerc == "")
			req.body.minPerc = quiz.minPerc;
        if(req.body.correctScore == "")
			req.body.correctScore = quiz.correctScore;
        if(req.body.incorrectScore == "")
			req.body.incorrectScore = quiz.incorrectScore;
        if(req.body.duration == "")
			req.body.duration = quiz.duration;
        if(req.body.addcompQs) {
            let ele = req.body.addcompQs;
            let isPresent = false;
    
            if(quiz.compQs.length && quiz.compQs.find(q => q._id === ele._id)) {
                isPresent = true;
            }
    
                // let index = quiz.compQs.indexOf(ele);
            req.body.addcompQs = undefined;

            if(!isPresent) {
                console.log("flag true", quiz.compQs);
                quiz.compQs.push(ele);
                console.log("question added", quiz.compQs);
            }
            else {
                return res
                .status(409)
                .send({
                    message: "Question already exists!",
                });
            }
            req.body.compQs = quiz.compQs;
        }
        if(req.body.delcompQs) {
            let ele = req.body.delcompQs;
            let index = -1;
            let isPresent = false;
    
            if(quiz.compQs.length && quiz.compQs.find(q => q._id === ele._id)) {
                index = quiz.compQs.findIndex((q, index) => q._id === ele._id)
                isPresent = true;
            }
    
            req.body.delcompQs = undefined;
    
            if(isPresent) {
                quiz.compQs.splice(index, 1);
                console.log("deleted", quiz.compQs)
            }
            else {
                return res
                .status(409)
                .send({
                    message: "Question has not been added!",
                });
            }
            req.body.compQs = quiz.compQs;
        }
		
        if(req.body.addUsers) {
            let ele = req.body.addUsers;
            let isPresent = false;

            if(quiz.users.length && quiz.users.find(q => q._id === ele._id)) {
                isPresent = true;
            }

            req.body.addUsers = undefined;

            if(!isPresent) {
                console.log("flag true", quiz.users);
                quiz.users.push(ele);
                quiz.attempted.push(false);
                console.log("User added", quiz.users);
            }
            else {
                return res
                .status(409)
                .send({
                    message: "User already exists!",
                });
            }
            req.body.users = quiz.users;
        }

        if(req.body.addAllUsers) {
            let arr = req.body.addAllUsers;
            arr.length && arr.map((user,idx)=>{
               
            let isPresent = false;

            if(quiz.users.length && quiz.users.find(q => q._id === user._id)) {
                isPresent = true;
            }

            req.body.addAllUsers = undefined;

            if(!isPresent) {
                console.log("flag true", quiz.users);
                quiz.users.push(user);
                quiz.attempted.push(false);
                console.log("Users added", quiz.users);
            }
            
            req.body.users = quiz.users;
            })
        }

        if(req.body.delUsers) {
            let ele = req.body.delUsers;
            let index = -1;
            let isPresent = false;

            if(quiz.users.length && quiz.users.find(q => q._id === ele._id)) {
                index = quiz.users.findIndex((q, index) => q._id === ele._id)
                isPresent = true;
            }

            req.body.delUsers = undefined;

            if(isPresent) {
                quiz.users.splice(index, 1);
                quiz.attempted.splice(index, 1);
                console.log("User deleted", quiz.users)
            }
            else {
                return res
                .status(409)
                .send({
                    message: "User has not been added!",
                });
            }
            req.body.users = quiz.users;
        }

        if(req.body.delAllUsers) {
            let arr = req.body.delAllUsers;
            if(arr !== undefined){
                arr.length && arr.map((user,idx)=>{
               
                    let index = -1;
                    let isPresent = false;
        
                    if(quiz.users.length && quiz.users.find(q => q._id === user._id)) {
                        index = quiz.users.findIndex((q, index) => q._id === user._id)
                        isPresent = true;
                    }
        
                    req.body.delAllUsers = undefined;
        
                    if(isPresent) {
                        quiz.users.splice(index, 1);
                        quiz.attempted.splice(index, 1);
                        console.log("Users deleted", quiz.users)
                    }
                    else {
                        return res
                        .status(409)
                        .send({
                            message: "Users do not exist!",
                        });
                    }
                    req.body.users = quiz.users;
                })
            }
        }
        
        if(req.body.attempted == undefined)
			req.body.attempted = quiz.attempted;
        if(req.body.expiryTime == undefined)
			req.body.expiryTime = quiz.expiryTime;
        if(req.body.expired == undefined)
			req.body.expired = quiz.expired;

        const { error } = validate(req.body);

		if(error) {
			//console.log(error);
            if(error.details[0].type != "any.required")
				return res.status(400).send({ message: error.details[0].message });
			//return res.status(400).send(error);
        }

		const result = await compQuiz.findByIdAndUpdate(_id,req.body,{new: true});
        console.log(result)
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Record updation failed!"
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
        console.log(err);
        res.send(err);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await compQuiz.findByIdAndDelete(_id);
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