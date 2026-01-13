import { Router } from "express";
import { VaultClient } from "../services/VaultClient";

export const vaultRouter = Router();
const client = new VaultClient();

vaultRouter.post("/store", async (req, res) => {
  const { payload } = req.body;
  if (!payload) return res.status(400).json({ error: "payload required" });
  const id = await client.store(payload);
  res.status(201).json({ id });
});

vaultRouter.get("/load/:id", async (req, res) => {
  const result = await client.load(req.params.id);
  if (!result) return res.status(404).json({ error: "not found" });
  res.json(result);
});
