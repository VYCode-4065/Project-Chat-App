import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

const sendMessageController = async (req, res) => {
    try {

        const { message } = req.body;

        const { id: receiverId } = req.params;

        if (!receiverId) {
            return res.status(400).json({
                message: "Choose receiver to send message ",
                error: true,
                success: false
            })
        }


        const senderId = req.user?._id;
        // senderId?.toString();
        if (!senderId) {
            return res.status(400).json({
                message: "Login first to send message ",
                error: true,
                success: false
            })
        }

        let conversation = await Conversation.findOne({
            participants: {
                $all: [receiverId, senderId]
            }
        })

        if (!conversation) {


            conversation = await Conversation.create({
                participants: [receiverId, senderId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message: message && message
        })

        if (!newMessage) {
            return res.status(400).json({
                message: "Can't send message at this moment ",
                error: true,
                success: false
            })
        }

        if (newMessage) {
            conversation.messages.push(newMessage._id);
            await conversation.save();
        }

        res.json({
            message: "Message sends successfully !",
            error: false,
            success: true,
            data: newMessage
        })

    } catch (error) {
        console.log('Error at send message controller ', error.message || error);
        res.status(500).json({
            message: "Internal server error ",
            success: false,
            error: true
        })

    }
}

const getMessagesController = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export {
    sendMessageController,
    getMessagesController
}