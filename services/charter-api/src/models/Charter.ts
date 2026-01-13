import { z } from "zod";

export const CharterSchema = z.object({
  subjectDid: z.string(),
  bundleCode: z.string(),
  jurisdiction: z.string(),
  charter: z.record(z.any())
});

export type Charter = z.infer<typeof CharterSchema>;
