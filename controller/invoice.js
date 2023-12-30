import Invoice from "../schema/invoice.js";
import User from "../schema/user.js";

const saveInvoiceDetails = async (req, res) => {
    try {
        const _id = req.user;
        const { invoiceDetails } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                $inc: { invoiceCounter: 1 },
            },
            { new: true },
        );
        const invoice = new Invoice({
            ...invoiceDetails,
            invoiceNumber: updatedUser.invoiceCounter,
            sender: _id,
        });
        await invoice.save();

        const sanitizedInvoice = {
            invoiceNumber: invoice.invoiceNumber,
            dueDate: invoice.dueDate,
            clientName: invoice.clientName,
            total: invoice.total,
            status: invoice.status,
            _id: invoice._id,
        };

        res.status(200).json({
            invoice: sanitizedInvoice,
            code: 200,
            message: "Invoice details saved successfully!",
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

const getInvoicesOverview = async (req, res) => {
    try {
        const _id = req.user;
        const invoices = await Invoice.find({ sender: _id })
            .select("invoiceNumber dueDate clientName total status")
            .sort({ createdAt: -1 })
            .lean();
        res.status(200).json({
            invoices,
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
        const invoice = await Invoice.findOne({ invoiceNumber: invNum })
            .populate({
                path: "sender",
                select: "-createdAt -email -password -invoiceCounter -updatedAt -__v",
            })
            .lean();
        delete invoice.createdAt;
        delete invoice.updatedAt;
        delete invoice.__v;
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
        const { _id } = req.params;
        await Invoice.findByIdAndDelete(_id);
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
