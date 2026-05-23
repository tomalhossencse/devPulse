import { Router } from "express";
import {
  createIssue,
  deleteIssue,
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
router.delete("/:id", auth, authorizeByRole("maintainer"), deleteIssue);

export default router;
