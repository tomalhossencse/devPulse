export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "contributor" | "maintainer";
  created_at: Date;
  updated_at: Date;
};

export type Order = {
  id: number;
  title: string;
  description: string;
  type: "bug" | "feature_request";
  status: "open" | "in_progress" | "resolved";
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
};

export const roles = ["contributor", "maintainer"] as const;
export type Role = (typeof roles)[number];
export type RUser = Omit<User, "id" | "password" | "created_at" | "updated_at">;
export type ROrder = Omit<Order, "created_at" | "updated_at">;
