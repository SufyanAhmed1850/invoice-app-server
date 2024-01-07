import Invoice from "../schema/invoice.js";

const searchInvoiceNumber = async (req, res) => {
    const _id = req.user;
    const invNum = req.query.invoiceNumber;
    const company = req.company;
    console.log(_id);
    console.log(invNum);
    try {
        const invoice = await Invoice.findOne({
            sender: _id,
            invoiceNumber: invNum,
        })
            .select("invoiceNumber dueDate clientName total status")
            .lean();

        delete invoice.createdAt;
        delete invoice.updatedAt;
        delete invoice.__v;

        res.status(200).json({
            invoice,
            company,
            code: 200,
            message: "Invoice found!",
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

export { searchInvoiceNumber };
