# de-bunker

Purpose
-------

De-bunker is a decentralized credential manager built on top of the BlockDAG blockchain. It provides a web UI (Next.js) client that lets users store, view, share, and manage cryptographic credentials (passwords, secure notes, keys, and other sensitive items) while keeping custody under the user's control and leveraging blockchain-backed proofs and events for auditability.

The project includes:

- `client/` — A Next.js 14+ app (React + TypeScript) that provides the user interface, wallet connection, credential management screens, and integrations with blockchain and IPFS services.
- `server/` — A Node.js/Express backend for optional off-chain services (indexing, IPFS gateway, authentication helpers, and transaction relay).
- `contracts/` — Hardhat-managed Solidity smart contracts that model the on-chain storage and access patterns (e.g., `SecureVault.sol`).

Quick start
-----------

Developer prerequisites
- Node.js 18+ (or the version declared in package.json engines)
- pnpm (preferred) or npm/yarn
- Hardhat and a local Ethereum-compatible node for contract development (e.g., Hardhat Network) if you want to run contracts locally

Set up the client

```bash
cd client
pnpm install
pnpm dev
```

Open http://localhost:3000 to view the UI.

Set up the server (optional)

```bash
cd server
pnpm install
pnpm start
```

Run tests and contracts

- Contracts are in the `contracts/` directory and use Hardhat. From the root:

```bash
cd contracts
pnpm install
pnpm test
# or run Hardhat tasks
pnpm hardhat test
```

Architecture overview
---------------------

- Client: Next.js app with app-router. Pages and components live under `client/app/`. Key areas:
  - `app/components/` — Reusable UI components (wallet connect, credential modal, vault UI).
  - `app/hooks/useWeb3.tsx` — Web3 provider hook and wallet connection utilities.
  - `app/lib/` — Helpers for credentials, crypto, and interactions with on-chain services.
- Contracts: Solidity contracts under `contracts/` (e.g., `SecureVault.sol`) compiled by Hardhat. Typechain types are generated into `contracts/typechain-types`.
- Server: Express server provides auxiliary endpoints for IPFS and indexing. Routes are under `server/src/routes`.

How it works (high level)
--------------------------

1. User connects their wallet from the Next.js client (Metamask/Social wallet). The client stores minimal metadata locally.
2. When a user saves a credential, the client encrypts the data locally using a key derived from the user's wallet/seed and/or a user-managed passphrase.
3. Encrypted credential data is optionally stored in IPFS. A reference (CID) is stored on-chain via a transaction against `SecureVault` which records the CID and an access control policy.
4. The server can index on-chain events and offer an optional search/relay service. The server is not required for normal operation; it provides convenience features.

Common tasks
------------

- Add a new credential: Use the Vault UI in the client to create a credential. The client will encrypt and upload the payload, then submit the on-chain reference.
- View credential: The client fetches the CID, downloads from IPFS, decrypts locally and displays in the modal.
- Share credential: The client can create a time-limited permission or signed proof allowing another address to retrieve the credential.

Developer notes
---------------

- Code style follows Prettier / ESLint rules in `client`.
- TypeScript types are in `client/types` and `contracts/typechain-types`.

Next steps / TODOs
------------------

- Add end-to-end tests for UI flows (create, retrieve, share).
- Improve UX for multi-account management and recovery.
- Integrate BlockDAG-specific RPC providers and chain support.

License
-------

MIT
