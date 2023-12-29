import express from "express";
import {
    saveCompanyDetails,
    getCompanyDetails,
} from "../controller/company.js";

const COMPANY = express.Router();

COMPANY.route("/").post(saveCompanyDetails);
COMPANY.route("/").get(getCompanyDetails);

export default COMPANY;
