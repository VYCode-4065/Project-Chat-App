import User from '../models/user.model.js';

const sidebarUserController = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;

        if (!loggedInUserId) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Login first to get user"
            })
        }

        const filteredUsers = await User.find({
            _id: {
                $ne: loggedInUserId
            }
        }).select("-password")

        return res.json({
            success: true,
            error: false,
            data: filteredUsers
        })

    } catch (error) {
        console.log('error at sidebarUserController', error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: true
        })
    }
}


export {
    sidebarUserController
}