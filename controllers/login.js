const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

async function loginController(request, response) {

    const generateSecretkey = () => {
        const key = crypto.randomBytes(32).toString()

        return key
    }


    const secretkey = generateSecretkey()


    try {
        const { email, password } = request.body;
        if (!email) {
            response.status(400).json({
                message: "Email required",
                success: false,
                error: true
            })
        }
        if (!password) {
            response.status(400).json({
                message: "Password required",
                success: false,
                error: true
            })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(400).json({
                message: "User not found",
                error: true,
                success: false
            })
        }

        const decryptPassword = await bcrypt.compare(password, user.password)

        if (decryptPassword) {
            const token = jwt.sign({ userId: user._id }, secretkey)

            response.status(201).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false,
            })
        } else {
            return response.status(400).json({
                message: "Invalid password",
                success: false,
                error: true
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: error || "Server error",
            success: false,
            error: true
        })
    }
}

module.exports = loginController