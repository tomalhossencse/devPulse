import jwt from "jsonwebtoken";
import type { RUser } from "../types";
import config from "../config";

export const signToken = (payload: RUser & { id: number }) => {
  const accessToken = jwt.sign(payload, config.access_secret, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(payload, config.refresh_secret, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret =
    type === "access" ? config.access_secret : config.refresh_secret;

  const decode = jwt.verify(token, secret);
  return decode;
};
