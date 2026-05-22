import { sql } from "../../db";
import type { RUser } from "../../types";
import bcrypt from "bcrypt";
class AuthService {
  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(password: string, hashPassword: string) {
    const result = await bcrypt.compare(password, hashPassword);
    return result;
  }

  async createAccount(user: RUser & { password: string }) {
    const { name, email, password, role } = user;

    const hashPassword = await this.hashPassword(password);

    const res = await sql`
    INSERT INTO users(name, email, password, role)
    VALUES(${name}, ${email},${hashPassword}, COALESCE(${role}, 'contributor'))
    RETURNING *
    `;

    return res[0];
  }
}

export default new AuthService();
