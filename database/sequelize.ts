import { Sequelize } from "sequelize";
import postgres from "pg";

const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE || "",
  process.env.POSTGRES_USER || "",
  process.env.POSTGRES_PASSWORD || "",
  {
    host: process.env.POSTGRES_HOST || "",
    dialectModule: postgres,
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
  }
);
export default sequelize;
