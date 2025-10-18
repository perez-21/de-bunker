## D-Bunker Product Requirements Document (PRD)

### Overview

Product Name: **D-Bunker**
### Summary
D-Bunker is a **decentralized credentials manager** that allows users to securely store and share their sensitive data. It uses **IPFS** for encrypted data storage and the **BlockDAG** network for secure, granular access control via **Proxy Re-encryption**.

***

## Goals and Objectives

* **Security & Data Sovereignty:** Provide users with non-custodial, end-to-end encrypted storage, ensuring **only the user controls access**.
* **Decentralization:** Minimize reliance on central servers by utilizing the BlockDAG network for access control logic and IPFS for data storage.
* **Usability:** Deliver a simple, intuitive user experience that abstracts away the complexity of Web3 for core credential management tasks.
* **Advanced Access Control:** Implement and leverage **Proxy Re-encryption** for secure and granular key management, sharing, and robust revocation.

***

## Functional Requirements

-   User can connect Wallet (as their primary identity and authentication mechanism).
-   User can **store encrypted credentials** (**Ciphertext**) on **IPFS**.
-   User can **share their credential** with other users by initiating a **Proxy Re-encryption** process, which writes a new encrypted key to the chain.
-   User can **revoke** other users' access, which triggers a **full re-encryption** of the credential ciphertext, invalidating all prior re-encryption keys.
-   User can **edit** and **delete** their stored credentials, which also triggers a full ciphertext re-encryption.

***

## Problem Statement

Centralized credentials managers represent a single point of failure and lack a cryptographically secure, granular, and revocable sharing mechanism. D-Bunker solves this by using decentralized identity and a BlockDAG-based access control layer. The use of **Proxy Re-encryption** provides a powerful solution for granular key management, ensuring that **revocation is absolute**—by re-encrypting the core ciphertext and invalidating all prior keys, thus preventing unauthorized future access.

***

## Product Scope

### In Scope
-   Smart contract deployment for core functionality (access control, data pointer management).
-   Wallet authentication (**Metamask, Wallet Connect**).
-   Credential manager dashboard with entries and management.
-   **End-to-End Encryption** of stored data and key management via **Proxy Re-encryption**.
-   Integration with **IPFS** for encrypted data persistence.

### Out of Scope
-   Mobile app version
-   Browser Extension
-   Multi-chain support beyond BlockDAG
-   Automated password generation or autofill functionality.
-   Integration with fiat payment gateways.

***

## Key Features

### High Priority
-   **Wallet Login:** Allow users to connect via Metamask and Wallet Connect.
-   **Smart Contract & IPFS Integration:**
    -   Store the **encrypted ciphertext hash** and the owner's **encrypted secret key** on the BlockDAG network.
    -   Store the credential data as **Ciphertext** on IPFS.
-   **Credential Sharing:** Implement **Proxy Re-encryption** logic to generate and store a new re-encryption key for the authorized user on the chain.
-   **Revocation & Updates:** Implement the logic for **ciphertext re-encryption** (generating a new IPFS hash and key), which is the mechanism for both revoking access and updating credentials.

### Medium/Low Priority
-   Activity Log: Display a history of access grants and revocations for each credential.

***

## Blockchain Components

### Smart Contracts
-   Language: **Solidity**
-   Contracts:
    -   **SecureVault.sol**: Manages the mapping of user addresses to their credential entry IDs. Stores the **IPFS Ciphertext hash** and the corresponding **encrypted secret key** for access. Implements the **Proxy Re-encryption** key management logic.
-   Auditing: **In-house security review** by the development team.

### Network
-   Primary Network: **BlockDAG**
-   Test Network: *To be defined (e.g., BlockDAG Testnet, or a compatible EVM testnet for development)*.
-   Gas Optimisation Strategy: Prioritize state-change minimization (only storing hashes/keys, not full data).

***

## Frontend & UX

### UI Components
-   Wallet Connection Modal.
-   Dashboard with Credentials' Names/Titles, User's Address, and Public Encryption Key display.
-   **Sharing Interface:** A dedicated section to input a recipient's address to initiate Proxy Re-encryption.
-   **Revocation Confirmation:** Clear warnings and confirmation pop-ups for revocation, explaining that it also triggers a full re-encryption of the credential.
-   Real-time blockchain event notifications.

### Design Principles
-   Simple Onboarding for Web3 newcomers.
-   **Security-Centric:** Clearly communicate the re-encryption and key management process to users.
-   Responsive design.

***

## Tech Stack

- Frontend: **React/ Next.js**
- Web 3 Integration: **ethers.js / web3.js** (or a BlockDAG-specific library if necessary)
- Backend: **Node.js / Next.js**
- Data indexing: *To be defined (e.g., a custom indexer or BlockDAG-specific tool)*
- Storage: **IPFS** (Storing the **Ciphertext** of the credentials)
- Encryption: **Proxy Re-encryption** implementation (e.g., using libraries like - - - - NuCypher or similar cryptographic primitives for key management and secure sharing).
- Credential Data: Stored as **Ciphertext** (an encrypted blob).
