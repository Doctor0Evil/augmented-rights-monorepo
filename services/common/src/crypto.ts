import { createHash, randomBytes } from "crypto";

export function sha256Hex(data: string | Buffer): string {
  const hash = createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

export function randomId(bytes = 16): string {
  return randomBytes(bytes).toString("hex");
}
