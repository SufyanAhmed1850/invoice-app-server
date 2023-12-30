import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        invoiceCounter: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        companyDetails: {
            name: {
                type: String,
                default: null,
            },
            address: {
                type: String,
                default: null,
            },
            city: {
                type: String,
                default: null,
            },
            postCode: {
                type: String,
                default: null,
            },
            country: {
                type: String,
                default: null,
            },
        },
    },
    {
        timestamps: true,
    },
);

const User = model("User", userSchema);

export default User;
