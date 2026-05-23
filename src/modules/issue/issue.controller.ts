import type { Request, Response } from "express";
import issueService from "./issue.service";
import type { RIssue, Sort, Status, Type } from "../../types";
import { sendResponse } from "../../middlewares/sendResponse";
import { stat } from "fs";

export const createIssue = async (req: Request, res: Response) => {
  const { title, description, type } = req.body as Omit<
    RIssue,
    "status" | "reporter_id"
  >;

  if (!req.user) {
    return sendResponse(res, { message: "unauthorized", error: true }, 401);
  }
  const reporter_id = req.user.id;

  const issue = await issueService.createIssue(
    { title, description, type },
    reporter_id,
  );

  if (!issue) {
    return sendResponse(
      res,
      { message: "Failed to Create Issue", error: true },
      400,
    );
  }
  sendResponse(
    res,
    { message: "Issue created successfully", data: issue },
    201,
  );
};

export const getIssue = async (req: Request, res: Response) => {
  const filters = {
    sort: req.query.sort as Sort,
    type: req.query.type as Type,
    status: req.query.status as Status,
  };

  const issues = await issueService.getIssue(filters);

  if (!issues) {
    return sendResponse(res, { message: "Issues not Found", error: true }, 400);
  }

  return sendResponse(
    res,
    { message: "Issues Retrived Succefully", data: issues },
    200,
  );
};
