import { sha256Hex, randomId } from "@augmented-rights/services-common/src/crypto";
import type { Charter } from "../models/Charter";

export interface CommitmentRecord {
  id: string;
  charterHash: string;
  subjectDidHash: string;
  jurisdictionHash: string;
  bundleCode: string;
  charter: Charter["charter"];
}

export class CommitmentService {
  async createCommitment(input: Charter): Promise<CommitmentRecord> {
    const serialized = JSON.stringify(input.charter);
    const charterHash = sha256Hex(serialized);
    const subjectDidHash = sha256Hex(input.subjectDid);
    const jurisdictionHash = sha256Hex(input.jurisdiction);

    return {
      id: randomId(),
      charterHash,
      subjectDidHash,
      jurisdictionHash,
      bundleCode: input.bundleCode,
      charter: input.charter
    };
  }
}
