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

  async getIssue() {
    // 1. get all issues
    const issues = await sql`
    SELECT * FROM issues
    `;

    // 2.extract repoter id

    const reporterIds = issues.map((issue) => issue.reporter_id);

    // 3. remove dupcate

    const uniqueReporterIds = [...new Set(reporterIds)];

    // 4. feach all user

    const reporters = await sql`
        SELECT id, name, role
        FROM users
        WHERE id = ANY(${uniqueReporterIds})
         `;

    // 5. lookup table for users

    const reporterMap = new Map(reporters.map((user) => [user.id, user]));

    console.log(reporterMap.get(8));

    // 6. attach reporter data to issues

    const issuesData = issues.map((issue) => ({
      ...issue,
      reporter: reporterMap.get(issue.reporter_id),
    }));

    return issuesData;
  }
}

export default new IssueService();
