export const fileExchangeContract = {address: '', ABI: []};
export const SecureVaultContract = {
    address: '', // TODO: Replace with deployed contract address
    ABI: [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "entryId",
                    "type": "string"
                },
                {
                    "internalType": "bytes",
                    "name": "encryptedData",
                    "type": "bytes"
                }
            ],
            "name": "storeData",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "entryId",
                    "type": "string"
                }
            ],
            "name": "retrieveData",
            "outputs": [
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "entryId",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "dataLength",
                    "type": "uint256"
                }
            ],
            "name": "DataStored",
            "type": "event"
        }
    ]
};