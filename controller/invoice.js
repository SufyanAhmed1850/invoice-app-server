import Invoice from "../schema/invoice.js";
import User from "../schema/user.js"; // Import the User model

const saveInvoiceDetails = async (req, res) => {
    try {
        const { _id } = req.user;
        console.log(req.user);
        console.log(req.body);
        const { invoiceDetails } = req.body;

        const updatedUser = await User.findByIdAndUpdate(_id, {
            $inc: { invoiceCounter: 1 },
        });
        invoiceDetails.invoiceNumber = updatedUser.invoiceCounter;
        invoiceDetails.sender = _id;
        const invoice = new Invoice(invoiceDetails);
        const newInvoice = await invoice.save();

        res.status(200).json({
            code: 200,
            message: "Invoice details saved successfully!",
            status: true,
            invoice: newInvoice,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: 400,
            message: error.message,
            status: false,
        });
    }
};

const getInvoicesOverview = async (req, res) => {
    try {
        const { _id } = req.user;
        const invoices = await Invoice.find(
            { sender: _id },
            "invoiceNumber dueDate clientName total status",
        )
            .sort({ createdAt: -1 })
            .lean();
        res.status(200).json({
            invoices: invoices,
            code: 200,
            message: "Invoices overview details successfully retrieved!",
            status: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: 400,
            message: error.message,
            status: false,
        });
    }
};
const getInvoiceDetails = async (req, res) => {
    try {
        const { invNum } = req.params;
        const invoice = await Invoice.findOne({
            invoiceNumber: invNum,
        })
            .populate({
                path: "sender",
                select: "-createdAt -email -password -invoiceCounter -updatedAt -__v",
            })
            .select({ createdAt: 0, __v: 0, updatedAt: 0 });
        res.status(200).json({
            invoice,
            code: 200,
            message: "Invoice details successfully retrieved!",
            status: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: 400,
            message: error.message,
            status: false,
        });
    }
};
const editInvoiceDetails = async (req, res) => {
    try {
        const invoiceToUpdate = req.body._id;
        req.body._id = undefined;
        await Invoice.findByIdAndUpdate(invoiceToUpdate, req.body);
        res.status(200).json({
            code: 200,
            message: "Invoice details successfully edited!",
            status: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: 400,
            message: error.message,
            status: false,
        });
    }
};
const updateInvoiceStatus = async (req, res) => {
    try {
        const invoiceToUpdate = req.body._id;
        await Invoice.findByIdAndUpdate(invoiceToUpdate, { status: "Paid" });
        res.status(200).json({
            code: 200,
            message: "Invoice successfully updated to paid!",
            status: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: 400,
            message: error.message,
            status: false,
        });
    }
};
const deleteInvoice = async (req, res) => {
    try {
        const invoiceToDelete = req.params._id;
        await Invoice.findByIdAndDelete(invoiceToDelete);
        res.status(200).json({
            code: 200,
            message: "Invoice deleted successfully!",
            status: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: 400,
            message: error.message,
            status: false,
        });
    }
};

export {
    saveInvoiceDetails,
    getInvoicesOverview,
    getInvoiceDetails,
    editInvoiceDetails,
    updateInvoiceStatus,
    deleteInvoice,
};
