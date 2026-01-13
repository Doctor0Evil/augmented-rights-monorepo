# Rights Bundles

Rights bundles represent reusable, versioned templates for neurorights, prosthetics, and AI‑companion governance.

## Bundle Types

- **NEURORIGHTS_V1**
  - Mental privacy
  - Mental integrity
  - Cognitive liberty
  - Non‑discrimination

- **PROSTHETIC_V1**
  - User control over prosthetic actuation.
  - Safety and override mechanisms.
  - Telemetry minimization.

- **AI_COMPANION_V1**
  - Transparency of AI interactions.
  - Data minimization and retention.
  - Escalation and override policies.

Each bundle is versioned and linked to a canonical JSON template via URI in the RightsBundles contract.

## Versioning

- Bundle IDs are immutable identifiers.
- Bundle versions are represented in the off‑chain JSON referenced by the `uri` field.
- Governance API exposes upgrade and deprecation workflows tied to city consortium policy.[web:3]
