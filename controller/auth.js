import User from "../schema/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    try {
        console.log("Body", req.body);
        console.log("Header", req.headers);
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                statusCode: 400,
                message: "All fields are required",
            });
        }
        const foundUser = await User.findOne({ email }).exec();
        if (!foundUser) {
            return res.status(401).json({
                statusCode: 401,
                message: "Unauthorized",
                reason: "User does not exist",
            });
        }
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) {
            return res.status(401).json({
                statusCode: 401,
                message: "Unauthorized",
                reason: "password is incorrect",
            });
        }
        foundUser.password = undefined;
        const token = jwt.sign(
            { user: foundUser._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            },
        );
        return res
            .status(200)
            .json({ message: "Success", token, user: foundUser });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            code: 500,
            message: "Server error while Loging in.",
            status: false,
        });
    }
};

export { login };
