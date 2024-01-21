import Invoice from "../schema/invoice.js";

const searchInvoiceNumber = async (req, res) => {
    const _id = req.user;
    const invNum = req.query.invoiceNumber;
    const company = req.company;
    try {
        const invoice = await Invoice.findOne({
            sender: _id,
            invoiceNumber: invNum,
        })
            .select("invoiceNumber dueDate clientName total status")
            .lean();
        console.log(invoice);
        if (!invoice) {
            return res.status(200).json({
                invoice: null,
                company,
                code: 404,
                message: "No invoice found!",
                status: true,
            });
        }
        delete invoice.createdAt;
        delete invoice.updatedAt;
        delete invoice.__v;

        return res.status(200).json({
            invoice,
            company,
            code: 200,
            message: "Invoice found!",
            status: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            code: 400,
            message: error.message,
            status: false,
        });
    }
};

export { searchInvoiceNumber };
