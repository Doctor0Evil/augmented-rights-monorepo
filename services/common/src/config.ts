import dotenv from "dotenv";

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 4000),
  postgresUrl: process.env.POSTGRES_URL || "postgres://postgres:postgres@postgres-charter:5432/charters",
  governancePostgresUrl:
    process.env.GOV_POSTGRES_URL || "postgres://postgres:postgres@postgres-governance:5432/governance"
};
