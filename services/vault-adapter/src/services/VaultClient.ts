import { randomId } from "@augmented-rights/services-common/src/crypto";

interface StoredItem {
  id: string;
  payload: unknown;
}

export class VaultClient {
  private storeMap = new Map<string, StoredItem>();

  async store(payload: unknown): Promise<string> {
    const id = randomId();
    this.storeMap.set(id, { id, payload });
    return id;
  }

  async load(id: string): Promise<StoredItem | undefined> {
    return this.storeMap.get(id);
  }
}
