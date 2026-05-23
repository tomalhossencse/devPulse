export const ROLES = ["contributor", "maintainer"] as const;
export type Role = (typeof ROLES)[number];

export type Sort = "newest" | "oldest";
export type Type = "bug" | "feature_request";
export type Status = "open" | "in_progress" | "resolved";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
};

export type Issue = {
  id: number;
  title: string;
  description: string;
  type: Type;
  status: Status;
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
};

export type RUser = Omit<User, "id" | "password" | "created_at" | "updated_at">;
export type RIssue = Omit<Issue, "id" | "created_at" | "updated_at">;
