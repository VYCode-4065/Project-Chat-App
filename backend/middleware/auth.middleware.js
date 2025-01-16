import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'

const auth = async (req, _, next) => {

    try {
        const refreshToken = req.cookies.Refresh_Token || req?.headers?.cookie?.split(" Refresh_Token=")[1];

        // console.log();

        if (!refreshToken) {
            throw new Error("Login first !")
        }

        const verifiedUser = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SCECRET);

        const user = await User.findById(verifiedUser.userId);

        req.user = user;

        next();
    } catch (error) {
        console.error(error.message);
        next(new Error("Invalid token, please login again!"))
    }

}

export default auth;