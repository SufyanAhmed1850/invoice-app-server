import express from "express";
import saveCompanyDetails from "../controller/company.js";

const COMPANY = express.Router();

COMPANY.route("/").post(saveCompanyDetails);

export default COMPANY;
