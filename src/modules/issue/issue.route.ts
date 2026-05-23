import { Router } from "express";
import { createIssue, getIssue, getIssueById } from "./issue.controller";
import { auth } from "../../utils/auth";

const router = Router();

router.post("/", auth, createIssue);
router.get("/", getIssue);
router.get("/:id", getIssueById);

export default router;
