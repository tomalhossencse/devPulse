import { sql } from "../../db";
import bcrypt from "bcrypt";
import type { RUser, User } from "../../types";
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
    RETURNING id, name, email, role, created_at, updated_at
    `;

    return res[0];
  }

  async login(email: string, password: string) {
    const res = await sql`
    SELECT * FROM users
    WHERE email = ${email}
    `;

    if (!res.length) {
      return null;
    }

    const { password: hashPassword, ...user } = res[0] as User;

    const isMatch = await this.comparePassword(password, hashPassword);

    return isMatch ? user : null;
  }

  async getUserById(id: number) {
    const res = await sql`
    SELECT name, email,role, id  FROM users
    WHERE id = ${id}
    `;
    return res[0] as RUser & { id: number };
  }
}

export default new AuthService();
