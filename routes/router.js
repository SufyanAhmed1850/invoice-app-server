import express from "express";
import REGISTRATION from "./authentication/registration.js";
import AUTH from "./authentication/auth.js";
import Authorize from "../middleware/autherization.js";
import COMPANY from "./company.js";
import INVOICE from "./invoice.js";

const router = express.Router();

router.use("/signup", REGISTRATION);
router.use("/login", AUTH);
router.use("/company-details", Authorize, COMPANY);
router.use("/invoice", Authorize, INVOICE);

export default router;
