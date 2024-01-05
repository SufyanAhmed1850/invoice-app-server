import express from "express";
import { searchInvoiceNumber } from "../controller/search.js";

const SEARCH = express.Router();

SEARCH.route("/").get(searchInvoiceNumber);

export default SEARCH;
