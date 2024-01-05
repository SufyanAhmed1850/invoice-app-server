import express from "express";
import {
    saveInvoiceDetails,
    getInvoicesOverview,
    getInvoiceDetails,
    editInvoiceDetails,
    updateInvoiceStatus,
    deleteInvoice,
} from "../controller/invoice.js";

const COMPANY = express.Router();

COMPANY.route("/").post(saveInvoiceDetails);
COMPANY.route("/detail/:invNum").get(getInvoiceDetails);
COMPANY.route("/overview").post(getInvoicesOverview);
COMPANY.route("/edit").put(editInvoiceDetails);
COMPANY.route("/status").patch(updateInvoiceStatus);
COMPANY.route("/delete/:_id").delete(deleteInvoice);

export default COMPANY;
