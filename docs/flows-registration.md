# Registration Flow

This flow integrates DIDs, VCs, and the Augmented Rights Registry.

## Steps

1. **DID Creation**
   - Wallet generates a DID and key material (e.g., did:ethr, did:key, or KERI prefix).[page:0]

2. **Charter Drafting**
   - Wallet or provider selects a bundle and jurisdiction.
   - Charter API generates charter JSON and stores a draft.

3. **Commitment & Anchor**
   - Charter API computes charterHash and subjectDidHash.
   - Registry contract records the commitment with bundleId and jurisdiction.

4. **Vault Storage**
   - Vault Adapter writes encrypted charter into citizen vault.
   - Vault ID is returned to Charter API for indexing.

5. **VC Issuance**
   - Wallet requests a VC describing the charter, including:
     - Charter ID and bundle ID.
     - Jurisdiction.
     - Merkle root of claims and anchor info, following credential‑commons‑style VC models.[page:1]

6. **Acknowledgment**
   - Governance API records consent timestamp and optional witnesses for audit.

The flow aligns with consent receipt and healthcare data handling guidelines while preserving on‑chain minimality.[web:1][web:3]
