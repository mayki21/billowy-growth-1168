const mongoose=require("mongoose")

const userschema=mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    role:{type:String,default:"employee",enum:["employee","manager"]}
})

const userModel=mongoose.model("user",userschema)
module.exports=userModel

