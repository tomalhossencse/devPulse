import { Router } from "express";
import { createAccount, login } from "./auth.controller";

const router = Router();

router.post("/signup", createAccount);
router.post("/login", login);

export default router;
