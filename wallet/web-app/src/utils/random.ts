export function randomId(bytes: number): string {
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const buf = new Uint8Array(bytes);
    window.crypto.getRandomValues(buf);
    return Array.from(buf)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  // Node fallback; used mainly in dev.
  const { randomBytes } = require("crypto");
  return randomBytes(bytes).toString("hex");
}
