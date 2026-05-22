export const ROLES = ["contributor", "maintainer"] as const;
export type Role = (typeof ROLES)[number];

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
  type: "bug" | "feature_request";
  status: "open" | "in_progress" | "resolved";
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
};

export type RUser = Omit<User, "id" | "password" | "created_at" | "updated_at">;
export type RIssue = Omit<Issue, "id" | "created_at" | "updated_at">;
