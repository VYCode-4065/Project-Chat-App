
import User from "../models/user.model.js";
import { generateAccessToken } from '../utils/generateAccessToken.js'
import { generateRefreshToken } from "../utils/generateRefreshToken.js";

const signupController = async (req, res) => {
    try {

        const { fullName, userName, password, confirmPassword, gender } = req.body;



        if (!userName || !fullName || !password || !confirmPassword || !gender) {
            return res.status(401).json({
                error: true,
                success: false,
                message: "Provide all required fields"
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const femaleProfile = `https://avatar.iran.liara.run/public/boy?username=${userName}`;


        const profilePic = (gender === 'male') ? maleProfile : femaleProfile;



        const newUser = await User.create({
            fullName: fullName,
            userName: userName,
            password: password,
            profilePic: profilePic,
            gender: gender
        })


        return res.status(200).json({
            success: true,
            error: false,
            message: "User created successfully",
            data: newUser
        })


    } catch (error) {
        console.log(error.message || error);

        return res.status(500).json({
            error: true,
            success: false,
            message: "Internal server error during signup"
        })
    }
}

const loginController = async (req, res) => {
    try {

        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(401).json({
                error: true,
                success: false,
                message: "Provide all required fields"
            })
        }

        const existingUseruser = await User.findOne({ userName });
        if (!existingUseruser) {
            return res.status(401).json({ message: "User not found" });
        }

        const isPasswordcorrect = await existingUseruser.isPasswordCorrect(password);

        if (!isPasswordcorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const accessToken = generateAccessToken(existingUseruser?._id);
        const refreshToken = generateRefreshToken(existingUseruser?._id);

        existingUseruser.refresh_token = refreshToken;

        const option = {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: false
        }

        res.cookie('Access_Token', accessToken, option);
        res.cookie('Refresh_Token', refreshToken, option);

        res.json({
            message: 'User login successfully ',
            error: false,
            success: true,
            data: existingUseruser,
            refreshToken: refreshToken,
            accessToken: accessToken
        })

    } catch (error) {
        console.log(error.message || error);

        return res.status(500).json({
            error: true,
            success: false,
            message: "Internal server error during login"
        })

    }
}

const logoutController = async (req, res) => {
    try {

        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                error: true,
                message: "User didn't find  "
            })
        }

        const option = {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: false
        }
        res.clearCookie('Refresh_Token', option);
        res.clearCookie('Access_Token', option);

        return res.status(200).json({
            success: true,
            error: false,
            message: 'User logout successfully !'
        })

    } catch (error) {
        console.log(error.message || error + 'At logout controller ');

        res.status(500).json({
            message: "Internal error occured !",
            error: true,
            success: false
        })
    }
}

export {
    signupController,
    loginController,
    logoutController
}