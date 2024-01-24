import express from "express";
import { saveMessage, getAllMessages } from "../controller/portfolio.js";

const PORTFOLIO = express.Router();

PORTFOLIO.route("/message").post(saveMessage);
PORTFOLIO.route("/message/:portfolio").get(getAllMessages);

export default PORTFOLIO;
