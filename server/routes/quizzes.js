const router = require("express").Router();
const { Quiz, validate } = require("../Models/quiz");
const bcrypt = require("bcrypt");

router.get('/', async(req,res) => {
    try{
        const result = await Quiz.find();
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
		const result = await Quiz.findById(_id);
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

		const result = await new Quiz(req.body).save();
		
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
    try{
		const _id = req.params.id;
		const quiz = await Quiz.findById(_id);
        
        if(req.body.name == "")
			req.body.name = quiz.category;
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
        if (req.body.mcqQs !== undefined && req.body.mcqQs.length !== 0) {
           
          let arr = req.body.mcqQs;
          arr.map((ele) => {
            let index = quiz.mcqQs.indexOf(ele);
            if(index === -1) {
                quiz.mcqQs.push(ele);
            }
            
          });
          req.body.mcqQs = quiz.mcqQs;
        }
        if(req.body.delmcqQs !== undefined && req.body.delmcqQs.length !== 0)   
        {
            let arr = req.body.delmcqQs;
            arr.map((ele) => {
                let index = quiz.mcqQs.indexOf(ele);
                if(index !== -1) {
                    quiz.mcqQs.splice(index,1);
                }
            })
            req.body.mcqQs = quiz.mcqQs; 
        }

        
		
        const { error } = validate(req.body);

		if(error) {
			//console.log(error);
            if(error.details[0].type != "any.required")
				return res.status(400).send({ message: error.details[0].message });
			//return res.status(400).send(error);
        }
        
        //const result = await Quiz.findByIdAndUpdate(_id, { '$push': { 'mcqQs[0]': req.body.mcqQs } })

		const result = await Quiz.findByIdAndUpdate(_id,req.body,{new: true});
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
        console.log(err);
        res.send(err);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await quiz.findByIdAndDelete(_id);
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