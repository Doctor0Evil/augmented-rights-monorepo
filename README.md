# Augmented Rights Monorepo

This monorepo implements a governance‑grade Augmented Rights Registry with clean separation between on‑chain ledger, off‑chain charter/consent services, and citizen wallet/verification flows. It is designed for neurorights, prosthetics, and AI‑companion charters with healthcare‑style consent patterns and selective‑disclosure proofs.[web:1][web:2]

## Architecture

The system has three main layers:

- **Ledger layer (contracts/)**  
  EVM smart contracts anchor hash commitments of rights charters and bundles, maintain bundle IDs, and store ZK verifier roots. Hashes follow content‑addressable patterns and are agnostic to charter semantics, inspired by KERI’s seal/anchor pattern.[page:0]

- **Off‑chain services (services/)**  
  TypeScript/Node APIs manage charter JSON, cryptographic commitments, vault integration, and governance lifecycle (templates, disputes, revocations) using healthcare and consent‑receipt patterns.[web:1][web:3]

- **Wallet and ZK verification (wallet/, zk/)**  
  A Next.js web wallet issues and presents W3C Verifiable Credentials, using a VC library pattern similar to identity‑com/credential‑commons.[page:1]  
  Circom circuits and on‑chain verifiers allow proofs like “subject has an active charter with bundle X in jurisdiction Y” without revealing underlying health data, following patterns from zk‑Verifiable‑Credentials‑DB.[page:2]

### Quickstart

Prerequisites:

- Node 18+
- Yarn or npm
- Docker & Docker Compose
- Foundry or Hardhat toolchain

Steps:

```bash
git clone https://github.com/your-org/augmented-rights-monorepo.git
cd augmented-rights-monorepo

# Install tooling
npm install -g yarn

# Install dependencies
yarn install --ignore-engines

# Start full local stack (ledger + APIs + wallet)
docker compose -f infra/docker-compose.yml up -d

# In another terminal, deploy contracts locally
cd contracts
yarn install
yarn hardhat test
yarn hardhat run deploy/00-deploy-registry.ts --network localhost

# Start wallet UI
cd ../wallet/web-app
yarn dev
