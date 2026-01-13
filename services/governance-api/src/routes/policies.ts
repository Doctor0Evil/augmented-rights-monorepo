import { Router } from "express";

export const policiesRouter = Router();

const policies = [
  {
    id: "policy-1",
    name: "Default Health Charter Policy",
    description: "Baseline policy for neurorights charters."
  }
];

policiesRouter.get("/", (_req, res) => {
  res.json(policies);
});
