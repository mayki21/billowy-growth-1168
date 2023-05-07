const Redis=require('ioredis')
require('dotenv').config()
let configuration={
    host:"redis-14009.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    port:14009,
    username:"default",
    password:process.env.redispassword
}
const client=new Redis(configuration)

module.exports={client}