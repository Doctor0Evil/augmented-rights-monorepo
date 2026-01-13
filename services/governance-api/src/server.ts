import express from "express";
import { logger } from "@augmented-rights/services-common/src/logger";
import { templatesRouter } from "./routes/templates";
import { disputesRouter } from "./routes/disputes";
import { policiesRouter } from "./routes/policies";

export async function startServer(port: number): Promise<void> {
  const app = express();
  app.use(express.json());
  app.use("/templates", templatesRouter);
  app.use("/disputes", disputesRouter);
  app.use("/policies", policiesRouter);
  app.get("/healthz", (_req, res) => res.json({ status: "ok" }));

  return new Promise((resolve) => {
    app.listen(port, () => {
      logger.info({ port }, "governance-api listening");
      resolve();
    });
  });
}
