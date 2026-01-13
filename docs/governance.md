# Governance

Governance covers city consortium roles, charter lifecycle, and revocation.

## City Consortium

Roles:

- **City Operator**  
  Manages governance templates and bundle catalog.

- **Health Provider / Agency**  
  Initiates charters and updates status based on care or device changes.[web:1]

- **Citizen**  
  Holds wallet, manages consent and presentations.

## Charter Lifecycle

States:

- DRAFT → ACTIVE → SUSPENDED → REVOKED

Transitions are driven by Governance API endpoints and mirrored on‑chain via registry updates.

## Revocation

Revocation mechanisms:

- On‑chain toggling of `revokedAt` in CharterRecord.
- Off‑chain governance logs of who, when, and why.
- ZK circuits incorporate revocation epochs or active status as public inputs for robust verification.[page:2]

The model is designed to align with consent receipt and health data governance practices.[web:3]
