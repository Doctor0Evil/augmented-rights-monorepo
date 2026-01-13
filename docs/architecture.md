# Architecture

This document describes the ledger, vault, wallet, ZK, and governance components and how they interoperate for chartered rights management.[page:0][page:2]

## Components

- **Augmented Rights Registry (ARR)**  
  An EVM contract anchoring charter commitments (hashes) and mapping them to DIDs, bundle IDs, and governance state.

- **Rights Bundle Registry**  
  Defines parametrized bundle templates (neurorights, prosthetics, AI companions) with jurisdiction and policy references.

- **Charter API**  
  Off‑chain service that stores human‑readable charters and generates cryptographic commitments anchored on ARR while preserving KERI‑style context‑independent seals.[page:0]

- **Vault Adapter**  
  Mediates between citizen‑controlled vaults or external custodians and the Charter API, exposing a minimal, capability‑based interface.

- **Governance API**  
  Manages template catalogs, dispute lifecycles, and revocation hooks, oriented toward city‑level health governance and consent receipt practices.[web:3]

- **Wallet Web App**  
  Next.js UI that:
  - Registers a subject DID.
  - Manages charter bundles and consent lifecycle.
  - Issues and presents W3C Verifiable Credentials with Merkle‑based proofs similar to credential‑commons flows.[page:1]

- **ZK Circuits & Verifiers**  
  Circom circuits and Solidity verifiers that prove:
  - Possession of an active charter.
  - Bundle membership and jurisdiction.
  - Optional expiry and revocation checks via Merkle roots and public parameters.[page:2]

## Data Flow Overview

1. **Registration**
   - Wallet generates DID and keys.
   - Charter API issues a charter document, hashes it, and sends the commitment to ARR.
   - ARR stores `(charterHash, subjectDID, bundleId, jurisdiction, issuedAt)`.

2. **Vault Storage**
   - Charter API encrypts charter JSON using vault or subject keys.
   - Vault Adapter writes encrypted payload into the citizen’s vault.

3. **Credential Issuance**
   - Wallet constructs a VC referencing ARR commitment and bundle metadata.
   - Optional Merkle root of claims is anchored on‑chain for later inclusion proofs.[page:1]

4. **Verification**
   - Subject generates a ZK proof against an on‑chain root and verifier contract.
   - Verifier checks proof on‑chain or via light client and consults Governance API for revocation/policy constraints.[page:2]
