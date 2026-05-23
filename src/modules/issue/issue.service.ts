import { sql } from "../../db";
import type { RIssue, Sort, Status, Type } from "../../types";

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

  private async attachReporter(issues: any[]) {
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

    // 6. attach reporter data to issues with formating

    const issuesData = issues.map((issue) => {
      const { reporter_id, created_at, updated_at, ...rest } = issue;

      return {
        ...rest,
        reporter: reporterMap.get(issue.reporter_id),
        created_at,
        updated_at,
      };
    });

    return issuesData;
  }

  async getIssue(filters: { sort?: Sort; type?: Type; status?: Status }) {
    const { sort = "newest", type, status } = filters;

    let query = `
    SELECT * FROM issues
    WHERE 1 = 1
    `;

    const values: any[] = [];

    // filter by type

    if (type) {
      values.push(type);

      query += `
    AND type = $${values.length}
    `;
    }

    // filter by status

    if (status) {
      values.push(status);

      query += `
    AND status = $${values.length}
    `;
    }

    // by sorting

    if (sort === "oldest") {
      query += `
     ORDER BY created_at ASC
     `;
    } else {
      query += `
     ORDER BY created_at DESC
     `;
    }

    // 1. get all issues by filltering

    const issues = await sql.query(query, values);

    // 2. attach reporter and formating

    const issuesData = await this.attachReporter(issues);

    return issuesData;
  }

  async getIssueById(id: number) {
    const issue = await sql`
    SELECT * FROM issues
    WHERE id = ${id}
    `;

    const issueData = await this.attachReporter(issue);
    return issueData;
  }
}

export default new IssueService();
