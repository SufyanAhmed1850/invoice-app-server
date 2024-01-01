import Invoice from "../schema/invoice.js";
import User from "../schema/user.js";

const saveInvoiceDetails = async (req, res) => {
    try {
        const _id = req.user;
        const { invoiceDetails } = req.body;
        const updatedUser = await User.findById(_id);
        const incrementedCounter = String(
            Number(updatedUser.invoiceCounter) + 1,
        );
        updatedUser.invoiceCounter = incrementedCounter;
        await updatedUser.save();
        const paddedInvoiceNumber = incrementedCounter.padStart(6, "0");

        const invoice = new Invoice({
            ...invoiceDetails,
            invoiceNumber: paddedInvoiceNumber,
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
        const page = req.query.page;
        const limit = 10;
        const skip = (page - 1) * limit;
        const company = req.company;
        const _id = req.user;
        const invoices = await Invoice.find({ sender: _id })
            .select("invoiceNumber dueDate clientName total status")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .lean();
        const totalInvoices = await Invoice.countDocuments({ sender: _id });
        console.log(totalInvoices);
        const totalPages = Math.ceil(totalInvoices / limit);
        res.status(200).json({
            totalInvoices,
            pages: totalPages,
            company,
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
        const _id = req.user;
        const { invNum } = req.params;
        console.log(_id);
        console.log(invNum);
        const invoice = await Invoice.findOne({
            sender: _id,
            invoiceNumber: invNum,
        })
            .populate({
                path: "sender",
                select: "-createdAt -email -password -invoiceCounter -updatedAt -__v -_id",
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
        console.log(req.body);
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
