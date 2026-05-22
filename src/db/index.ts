import { neon } from "@neondatabase/serverless";
import config from "../config";

export const sql = neon(config.database_url);

export const initDB = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS users(

        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(20) DEFAULT 'contributor' CHECK (role IN ('contributor', 'maintainer')),
        created_at TIMESTAMP  DEFAULT NOW(),
        updated_at TIMESTAMP  DEFAULT NOW()

        )
    `;

  await sql`
    CREATE TABLE IF NOT EXISTS issues(

      id SERIAL PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      description TEXT NOT NULL CHECK(LENGTH(description) >=20),
      type VARCHAR(20) CHECK(type IN('bug','feature_request')),
      status VARCHAR(20) DEFAULT 'open' CHECK(status IN('open', 'in_progress', 'resolved')),
      reporter_id INT NOT NULL,
      created_at TIMESTAMP  DEFAULT NOW(),
      updated_at TIMESTAMP  DEFAULT NOW()

    )
    `;
  console.log("Database Connected");
};
