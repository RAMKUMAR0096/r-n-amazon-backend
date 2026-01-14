const User = require('../models/user')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const bcrypt =require('bcrypt')

async function registerCountroller(request, response) {
    try {
       
        const sendVerificationEmail = async (email, token) => {
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.NODEMAILER_USERNAME,
                    pass: process.env.NODEMAILER_APP_PASSWORD,
                },
            });  

            const mailOption = { 
                from : "amazon.com",
                to : email,
                subject : "Email verification",
                text : `Click the following link to verify your email : http://localhost:8000/api/verify/${token}`
            }

            try {
                await transporter.sendMail(mailOption)
            } catch (error) {
                console.log("error send the mail ", error)
            }
        }

        const { name, email, password } = request.body;

        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return response.status(400).json({
                message: "Email already exists",
                error: true,
                success: false
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password,salt)

        if(!hashpassword){
            return response.status(400).json({
                message : "something went wrong",
                error : true,
                success : false
            })
        }

        const payload = {
            name: name,
            email: email,
            password: hashpassword
        }

        const userData = new User(payload)

        userData.verificationToken = crypto.randomBytes(20).toString("hex");

        const saveUser = await userData.save()

        sendVerificationEmail(saveUser.email, saveUser.verificationToken)


        return response.status(201).json({
            data: saveUser,
            message: "Registered Successfully",
            success: true,
            error: false
        })

    } catch (error) {
      
        return response.status(500).json({
            message: error || "Server error",
            success: false,
            error: true
        })
    }
}

module.exports = registerCountroller