# Verification Flow

This flow uses minimal disclosure and ZK proofs to verify active charters.

## High‑Level Steps

1. **Proof Request**
   - Verifier requests proof of “active charter with bundle X in jurisdiction Y, not revoked”.

2. **Proof Construction**
   - Wallet derives the subset of claims required.
   - A Circom circuit proves:
     - The subject’s commitment is part of the Merkle root stored on‑chain.
     - Public inputs include bundleId, jurisdiction, and revocation epoch.[page:2]

3. **ZK Proof Generation**
   - Wallet uses zk tools (e.g., snarkjs or zk‑kit) similar to zk‑Verifiable‑Credentials‑DB to produce a proof.[page:2]

4. **On‑Chain or Off‑Chain Verification**
   - Verifier calls ZkCharterVerifier with proof and public inputs.
   - Verifier consults Governance API for real‑time revocation and policy hints.

5. **Decision**
   - If proof and policy checks pass, access is granted without exposing raw health or sensitive data.

This approach supports selective disclosure and auditability consistent with modern VC standards.[page:1][page:2]
