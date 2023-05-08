const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
require("dotenv").config()
const otpgen=require("otp-generator")
const {client}=require("../config/redis")
const {generateOtpAndSendEmail}=require("../nodemailer")
const usermodel=require("../model/user.model")
const userrout=express.Router()


userrout.post("/signup",async(req,res)=>{

    try {

     const {name,email,password,role}=req.body
     const clientSideOtp=req.query.otp
     const otp=await client.get("otp")

     const user=await usermodel.findOne({email})
     if(user)
     {
        return res.send({"msg":"user already present"})
     }
     if(clientSideOtp===undefined)
     {
        const otp=otpgen.generate(4,{lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        await client.set("otp",otp,"EX",60*30)
        generateOtpAndSendEmail(email, otp)

     }
     else if (clientSideOtp===otp)
      {
        const hashPassword = await bcrypt.hash(password, +process.env.saltRound)
        await new usermodel({name, email, password: hashPassword,role}).save()
        return res.send({"msg":"SignUp successful"})

      } 
      else 
      {
        return res.send({ "msg": "wrong otp" })
      }
      res.send({ "msg": "waiting for otp verification" })
        
    } 
    
    
    catch (error){
        console.log(error)
        res.send({"error":error.message})
    }


})



userrout.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await usermodel.findOne({ email })
        console.log(email, password)

        if (user) 
        {
            const matchPassword = bcrypt.compare(password, user.password)
            if (matchPassword)
            {
                const token = jwt.sign({ userId: user._id , role:user.role }, process.env.jwtSecretKey, { expiresIn: "7d" })
                const refreshToken = jwt.sign({ userId: user._id , role:user.role }, process.env.jwtRefreshSecretKey, { expiresIn: "10d" })
                res.cookie("token", token)
                res.cookie("refreshToken", refreshToken)
                res.cookie("email",email)
                res.send({ "msg": "login successful","name": user.name})
            } 
            else
            {
                res.send({ "msg": "wrong password" })
            }
        } 
        else
        {
            res.send({ "msg": "wrong credential" })
        }
    } 
    catch (error)
     {
        res.send({ "error": error.message })
     }
})

userrout.get("/logout", async (req, res) => 
{
    try 
    {
        const { token } = req.cookies
        await client.set("blacklist", token)
        res.send({ "msg": "Logout successfully done" })
    } 
    catch (error) 
    {
        res.send({ "error": error.message })
    }
})

userrout.get("/refreshToken", async (req, res) => {
    try {
        const refreshToken = req.cookies("refreshToken")
        const decoded = jwt.verify(refreshToken, process.env.jwtRefreshSecretKey)

        if (decoded) 
        {
            const token = jwt.sign({ userId: user._id }, process.env.jwtSecretKey, { expiresIn: "1h" })
            res.cookie("token", token)
            res.send({ "msg": "Token is refresh, please login again" })
        }
    } 
    catch (error)
    {
        res.send({ "error": error.message })
    }
})

module.exports=userrout
