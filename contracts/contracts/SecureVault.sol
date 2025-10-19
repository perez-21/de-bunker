// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
contract SecureVault {
    struct DataEntry {
        address owner;
        bytes encryptedData;
    }

    // Mapping: owner address => entry ID string => DataEntry struct
    // This allows each owner to have multiple data entries indexed by a string key (entryId)
    mapping(address => mapping(string => DataEntry)) private userVault;

    event DataStored(address indexed owner, string entryId, uint256 dataLength);

    function storeData(string memory entryId, bytes memory encryptedData) public {
        DataEntry storage entry = userVault[msg.sender][entryId];
        
        // If this is a new entry, set the owner and automatically authorize the owner
        if (entry.owner == address(0)) {
            entry.owner = msg.sender;
        }
        else {
          require(entry.owner == msg.sender, "You are not authorized");
        }

        entry.encryptedData = encryptedData;
        
        emit DataStored(msg.sender, entryId, encryptedData.length);
    }

    function retrieveData(string memory entryId) public view returns (bytes memory) {

        DataEntry storage entry = userVault[msg.sender][entryId];

        require(entry.owner == msg.sender, "You are not authorized");
        require(entry.encryptedData.length > 0, "No data stored for this ID by the owner.");

        return entry.encryptedData;

    }
    
}
