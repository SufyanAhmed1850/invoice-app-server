import { Schema, model } from "mongoose";

const invoiceSchema = new Schema(
    {
        invoiceNumber: String,
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        clientName: String,
        clientEmail: String,
        clientAddress: String,
        clientCity: String,
        clientPostCode: String,
        clientCountry: String,
        invoiceDate: Date,
        dueDate: Date,
        paymentTerms: Number,
        projectDescription: String,
        items: [
            {
                itemName: String,
                price: Number,
                qty: Number,
                total: Number,
            },
        ],
        total: Number,
        status: {
            type: String,
            enum: ["Paid", "Pending", "Draft"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    },
);

const Invoice = model("Invoice", invoiceSchema);

export default Invoice;
