import type { Request, Response } from "express";
import authService from "./auth.service";
import { sendResponse } from "../../middlewares/sendResponse";

export const createAccount = async (req: Request, res: Response) => {
  const newUser = await authService.createAccount(req.body);
  if (!newUser) {
    return sendResponse(res, { message: "Failed to Create Account" }, 400);
  }
  sendResponse(
    res,
    { message: "User registered successfully", data: newUser },
    201,
  );
};
