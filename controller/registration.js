import bcrypt from "bcrypt";
import userValidationSchema from "../schema/userValidation.js";
import User from "../schema/user.js";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        await userValidationSchema.validateAsync(req.body);
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userData = {
            email,
            password: hashedPassword,
            invoiceCounter: "0",
        };
        const user = new User(userData);
        const newUser = await user.save();
        newUser.password = undefined;
        const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            code: 200,
            message:
                "Account created successfully! You can now log in with your credentials.",
            token,
            user: newUser,
            status: false,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            code: 400,
            message: error.message,
            status: false,
        });
    }
};

export default registerUser;
