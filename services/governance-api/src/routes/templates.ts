import { Router } from "express";
import { inMemoryTemplates } from "../models/Template";

export const templatesRouter = Router();

templatesRouter.get("/", (_req, res) => {
  res.json(inMemoryTemplates);
});
