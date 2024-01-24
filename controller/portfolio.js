import portfolioMessage from "../schema/portfolioMessages.js";

const saveMessage = async (req, res) => {
    try {
        const message = await portfolioMessage(req.body);
        await message.save();
        return res.status(200).json({
            message: "Message sent successfully!",
        });
    } catch (error) {
        console.error(error);
        return res.status(422).json({
            error: error.message,
            message: "Failed to send the message!",
        });
    }
};

const getAllMessages = async (req, res) => {
    try {
        const { portfolio } = req.params;
        const messages = await portfolioMessage.find({ portfolio }).exec();
        if (messages.length === 0) {
            return res.status(200).json({
                message: "No message found!",
            });
        }
        return res.status(200).json({
            messages,
            message: "Messages retrieved successfully!",
        });
    } catch (error) {
        console.error(error);
        return res.status(422).json({
            error: error.message,
            message: "Failed to send the message!",
        });
    }
};

export { saveMessage, getAllMessages };
