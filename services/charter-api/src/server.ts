import express from "express";
import { logger } from "@augmented-rights/services-common/src/logger";
import { chartersRouter } from "./routes/charters";

export async function startServer(port: number): Promise<void> {
  const app = express();
  app.use(express.json());
  app.use("/charters", chartersRouter);

  app.get("/healthz", (_req, res) => res.json({ status: "ok" }));

  return new Promise((resolve) => {
    app.listen(port, () => {
      logger.info({ port }, "charter-api listening");
      resolve();
    });
  });
}
