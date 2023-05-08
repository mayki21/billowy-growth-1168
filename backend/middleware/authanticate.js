const { client } = require("../config/redis");
const jwt = require("jsonwebtoken")

const authanticate = async (req,res,next)=>
{
    try
     {
        const {token}=req.cookies
        const {email}=req.cookies
        const blacklist=await client.get("blacklist")

        if(token==blacklist)
        {
            return res.send({"msg":"Please login again"})
        }

        const decoded=jwt.verify(token,process.env.jwtSecretKey)
        
        if(decoded)
        {
            req.body.userId= decoded.userId
            req.body.role= decoded.role
            req.body.email=email
            next()
        }
        else
        {
            res.send({"msg":"you have to login to access"})
        }
    } 
    catch (error) 
    {
        res.send({"error":error.message})
    }
}

module.exports=authanticate