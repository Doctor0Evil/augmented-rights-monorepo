# Data Model

This document defines on‑chain and off‑chain schemas for the Augmented Rights Registry, leveraging content‑addressed hashes and healthcare‑style record structures.[web:1][web:3]

## On‑Chain Structures

### Charter Commitment

```solidity
struct CharterRecord {
  bytes32 charterHash;      // keccak256(content-addressed payload)
  bytes32 subjectDidHash;   // hashed DID or KERI prefix
  uint256 bundleId;         // Rights bundle identifier
  bytes32 jurisdiction;     // ISO code hash (e.g., "US-AZ")
  uint64 issuedAt;          // Unix timestamp
  uint64 revokedAt;         // 0 if active
}
Hashes follow content‑addressable patterns similar to KERI seals and IPLD hashlinks, ensuring format‑agnostic semantics.[page:0]

DID/VC linkage mirrors VC claim structures with Merkle roots for selective disclosure.[page:1][page:2]

Bundle Definition
text
struct RightsBundle {
  uint256 id;
  bytes32 code;        // e.g., "NEURORIGHTS_V1"
  bytes32 jurisdiction;
  string uri;          // Off-chain JSON schema
  bool active;
}
Off‑Chain Schemas
Charter JSON
json
{
  "id": "urn:charter:1234",
  "subject": "did:example:subject123",
  "bundle": "NEURORIGHTS_V1",
  "jurisdiction": "US-AZ",
  "version": "1.0.0",
  "issuedAt": "2026-01-10T00:00:00Z",
  "expiresAt": "2027-01-10T00:00:00Z",
  "sections": [
    {
      "code": "NEURO-READ",
      "description": "Right to mental privacy and limits on neural data capture."
    },
    {
      "code": "PROSTHETIC-CONTROL",
      "description": "Right to agency over networked prosthetic devices."
    }
  ],
  "healthContext": {
    "careTeamRefs": [],
    "recordLinkage": []
  }
}
This structure borrows from personal health record and consent receipt patterns, focusing on traceability and auditability.
