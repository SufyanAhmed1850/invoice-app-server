import express from "express";
import REGISTRATION from "./authentication/registration.js";
import AUTH from "./authentication/auth.js";
import Authorize from "../middleware/autherization.js";
import COMPANY from "./company.js";
import INVOICE from "./invoice.js";
import SEARCH from "./search.js";

const router = express.Router();

router.use("/signup", REGISTRATION);
router.use("/login", AUTH);
router.use("/company-details", Authorize, COMPANY);
router.use("/search", Authorize, SEARCH);
router.use("/invoice", Authorize, INVOICE);

export default router;
