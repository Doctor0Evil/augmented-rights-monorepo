import { Router } from "express";

export const disputesRouter = Router();

interface Dispute {
  id: string;
  charterId: string;
  reason: string;
  status: "OPEN" | "RESOLVED";
}

const disputes: Dispute[] = [];

disputesRouter.post("/", (req, res) => {
  const { charterId, reason } = req.body;
  if (!charterId || !reason) {
    return res.status(400).json({ error: "charterId and reason required" });
  }
  const id = `disp-${disputes.length + 1}`;
  disputes.push({ id, charterId, reason, status: "OPEN" });
  res.status(201).json({ id });
});

disputesRouter.get("/", (_req, res) => {
  res.json(disputes);
});
