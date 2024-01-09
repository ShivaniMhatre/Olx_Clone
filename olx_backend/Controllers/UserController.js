import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const SignUp = async (req, res) => {
    try {
        // const { userData } = req.body
        const { username, password } = req.body.userData;
        if (!username || !password) return res.json({ success: false, message: "All fields are mandtory.." })

        const isEmailExist = await UserModel.find({ username: username })
        if (isEmailExist.length) {
            return res.json({
                success: false,
                message: "UserName is exist, try diffrent email."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            username,
            password: hashedPassword
        });

        await user.save();

        return res.json({
            success: true,
            message: "User registered Successfully.",
        })

    } catch (error) {
        return res.json({ success: false, message: error })
    }
}

export const Login = async (req, res) => {
    try {
        const { username, password } = req.body.loginData;
        if (!username || !password) return res.json({ success: false, message: "All Fileds are required" })
        const user = await UserModel.findOne({ username })
        if (!user)
            return res.json({
                success: false,
                message: "User Not Found"
            })
        const isPassRight = await bcrypt.compare(password, user.password)
        if (isPassRight) {
            const userObj = {
                username: user.username,
                password: user.password,
                _id: user._id
            }
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })

            return res.json({ success: true, message: "Login Successfull", userData: userObj, token: token, userId: user._id })
        }
        return res.json({ success: false, message: "password Is Wrong" })

    }
    catch (error) {
        return res.json({ success: false, message: error })
    }
}