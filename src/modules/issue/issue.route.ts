import { Router } from "express";
import {
  createIssue,
  getIssue,
  getIssueById,
  updateIssue,
} from "./issue.controller";
import { auth, authorizeByRole } from "../../utils/auth";

const router = Router();

router.post("/", auth, createIssue);
router.get("/", getIssue);
router.get("/:id", getIssueById);
router.patch(
  "/:id",
  auth,
  authorizeByRole("maintainer", "contributor"),
  updateIssue,
);

export default router;
