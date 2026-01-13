import { Router } from "express";
import { CharterSchema } from "../models/Charter";
import { CommitmentService } from "../services/CommitmentService";

export const chartersRouter = Router();
const commitmentService = new CommitmentService();

chartersRouter.post("/", async (req, res) => {
  const parse = CharterSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }

  const record = await commitmentService.createCommitment(parse.data);
  // In a full implementation, persist to Postgres and call contracts.
  return res.status(201).json(record);
});

chartersRouter.get("/:id", async (_req, res) => {
  // Placeholder for retrieval logic.
  return res.status(404).json({ error: "Not implemented" });
});
