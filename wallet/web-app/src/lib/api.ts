import axios from "axios";

const CHARTER_API_BASE = process.env.NEXT_PUBLIC_CHARTER_API_BASE || "http://localhost:4001";

interface CharterRequest {
  subjectDid: string;
  bundleCode: string;
  jurisdiction: string;
  charter: unknown;
}

export async function createCharter(payload: CharterRequest): Promise<any> {
  const res = await axios.post(`${CHARTER_API_BASE}/charters`, payload);
  return res.data;
}
