import type { Request, Response } from "express";
import authService from "./auth.service";
import { sendResponse } from "../../middlewares/sendResponse";
import { signToken } from "../../utils/jwt";

export const createAccount = async (req: Request, res: Response) => {
  const newUser = await authService.createAccount(req.body);
  if (!newUser) {
    return sendResponse(
      res,
      { message: "Failed to Create Account", error: true },
      400,
    );
  }
  sendResponse(
    res,
    { message: "User registered successfully", data: newUser },
    201,
  );
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);

  if (!user) {
    return sendResponse(
      res,
      {
        message: "Your Password or Email is Invalid!",
      },
      401,
    );
  }

  const { accessToken, refreshToken } = signToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  const result = {
    token: accessToken,
    user,
  };

  sendResponse(res, {
    message: "Login successful",
    data: result,
  });
};
