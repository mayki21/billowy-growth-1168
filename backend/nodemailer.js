const nodemailer = require("nodemailer")
require("dotenv").config()


const generateOtpAndSendEmail = (email,otp) => {
    try {

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: 
            {
                user: process.env.nodemailerEmail,
                pass: process.env.nodemailerPass
            }
        });


        
        const mailOptions = 
        {
            from: process.env.nodemailerEmail,
            to: email,
            subject: "Verification OTP",
            text: `Your OTP is ${otp}`
        };


        
        transporter.sendMail(mailOptions, (error, info) =>
        {
            if (error) 
            {
                console.log(error);
                // res.send({ "msg": error.message })
            }
            else 
            {
                console.log(`Email sent: ${info.response}`);
            }
        });

    }
    catch (error) 
    {
        // res.send({ "error": error.message })
        console.log(error);
    }
}

module.exports=generateOtpAndSendEmail 