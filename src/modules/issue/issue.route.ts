import { Router } from "express";
import { createIssue, getIssue } from "./issue.controller";
import { auth } from "../../utils/auth";

const router = Router();

router.post("/", auth, createIssue);
router.get("/", getIssue);

export default router;
