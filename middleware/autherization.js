import User from "../schema/user.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const Authorize = async (req, res, next) => {
    try {
        console.log("Middle Authentication");
        const authorization = req.headers["authorization"];
        if (!authorization) {
            res.clearCookie("jwt");
            return res.status(401).json({
                message: "Unauthorized",
                reason: "No token available.",
                status: false,
            });
        }
        const token = authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userExist = await User.findById(decodedToken.user._id);
        if (!userExist) {
            return res.status(401).json({
                message: "Unauthorized",
                reason: "No user found.",
                status: false,
            });
        }
        req.user = decodedToken.user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};

export default Authorize;
