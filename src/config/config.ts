import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 1000,
  database_url: process.env.DATABASE_URL,
  userDefaultPassword: process.env.USER_DEFAULT_PASS,
};
