import express from "express";
import { login } from "../../controller/auth.js";

const AUTH = express.Router();

AUTH.route("/").post(login);

export default AUTH;
