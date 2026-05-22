import { sql } from "../../db";
import type { RIssue } from "../../types";

class IssueService {
  async createIssue(
    payload: Omit<RIssue, "status" | "reporter_id">,
    reporter_id: number,
  ) {
    const { title, description, type } = payload;

    const res = await sql`
    INSERT INTO issues(title, description, type, reporter_id )
    VALUES(${title}, ${description}, ${type}, ${reporter_id})
    RETURNING *
    `;
    return res[0];
  }
}

export default new IssueService();
