const userdatamodel=require("../model/user.data")
const express=require('express')
const usermodel=require("../model/user.model")


const datarout=express.Router()

datarout.post("/myTimeFrame", async (req, res) => {
    try {
        const {startTime,productiveTimeElapsed,unproductiveTimeElapsed,idleTimeElapsed,deskTimeElapsed,timeAtWorkTimeElapsed} = req.body;

        const existingRecord=await userdatamodel.findOne({startTime});

        if (existingRecord) 
        {
            let existingData = await userdatamodel.find()
            await userdatamodel.updateOne({startTime}, { $inc: {productiveTimeElapsed,unproductiveTimeElapsed,idleTimeElapsed,deskTimeElapsed,timeAtWorkTimeElapsed }});
            res.send({ "msg": "done","data":existingData });
        }
         else 
         {
            await new userdatamodel({startTime, productiveTimeElapsed, unproductiveTimeElapsed, idleTimeElapsed, deskTimeElapsed,timeAtWorkTimeElapsed}).save();

            res.send({ "msg": "done storing" });
        }
    } 
    catch (error)
     {
        res.send({ "error": error.message });
     }

})


datarout.delete("/deleteUser/:id", async (req, res) => {
    const userID = req.params.id
    await usermodel.findByIdAndDelete({ _id: userID })
    res.send({"msg": "user is deleted"})
})


datarout.get("/employees", async (req, res) => {
    try {
        let userInfo = await usermodel.find()
        if (userInfo) {
            res.json(userInfo)
        } else {
            res.send({"msg":"no users present"})
        }
    }
    catch (err) {
        console.log(err);
        res.send({ "msg": "error" })
    }
})




module.exports=datarout