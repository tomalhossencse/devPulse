import { Router } from "express";
import { createAccount } from "./auth.controller";

const router = Router();

router.post("/signup", createAccount);
router.post("/login", () => {});

export default router;
