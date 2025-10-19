"use server"

import { ethers } from 'ethers';
import * as EthCrypto from 'eth-crypto';
import { SecureVaultContract } from '@/app/shared/contractInfo';
import { VaultEntry } from '@/app/shared/types';

export async function storeVaultData(
    signer: ethers.Signer,
    entryId: string,
    encryptedData: Uint8Array
): Promise<ethers.TransactionResponse> {
    try {
        const contract = new ethers.Contract(
            SecureVaultContract.address,
            SecureVaultContract.ABI,
            signer
        );

        const tx = await contract.storeData(entryId, encryptedData);
        return tx;
    } catch (error) {
        console.error('Error storing data in vault:', error);
        throw error;
    }
}

export async function retrieveVaultData(
    signer: ethers.Signer,
    entryId: string
): Promise<Uint8Array> {
    try {
        const contract = new ethers.Contract(
            SecureVaultContract.address,
            SecureVaultContract.ABI,
            signer
        );

        const data = await contract.retrieveData(entryId);
        return data;
    } catch (error) {
        console.error('Error retrieving data from vault:', error);
        throw error;
    }
}

// Helper function to listen for DataStored events
export async function listenToDataStoredEvents(
    provider: ethers.Provider,
    callback: (owner: string, entryId: string, dataLength: number) => void
): Promise<ethers.Contract> {
    const vaultContract = new ethers.Contract(
        SecureVaultContract.address,
        SecureVaultContract.ABI,
        provider
    );

    vaultContract.on('DataStored', (owner: string, entryId: string, dataLength: bigint) => {
        callback(owner, entryId, Number(dataLength));
    });

    return vaultContract;
}

export async function getVaultEntry(
    signer: ethers.Signer,
    privateKey: string,
    entryId: string
): Promise<VaultEntry | null> {
    try {
        // Retrieve encrypted data from the contract
        const encryptedData = await retrieveVaultData(signer, entryId);
        if (!encryptedData || encryptedData.length === 0) {
            return null;
        }

        // Convert Uint8Array to string format expected by eth-crypto
        const encryptedString = new TextDecoder().decode(encryptedData);
        
        // Decrypt the data using the private key
        const decryptedData = await EthCrypto.decryptWithPrivateKey(
            privateKey,
            JSON.parse(encryptedString)
        );

        // Parse the decrypted JSON data
        const vaultEntry = JSON.parse(decryptedData) as VaultEntry;
        
        // Validate the entry structure
        if (!vaultEntry.id || !vaultEntry.name || !vaultEntry.type) {
            throw new Error('Invalid vault entry format');
        }

        return vaultEntry;
    } catch (error) {
        console.error('Error retrieving vault entry:', error);
        throw error;
    }
}
