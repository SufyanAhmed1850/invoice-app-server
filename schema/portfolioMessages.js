import { Schema, model } from "mongoose";

const portfolioMessageSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        portfolio: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const portfolioMessage = model("Portfolio Message", portfolioMessageSchema);

export default portfolioMessage;
