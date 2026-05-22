import { Router } from "express";
import { createIssue } from "./issue.controller";
import { auth } from "../../utils/auth";

const router = Router();

router.post("/", auth, createIssue);

export default router;
