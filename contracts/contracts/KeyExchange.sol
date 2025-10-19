// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract FileExchange {
    event FileSent(
        address indexed receiver,
        string encryptedKey,
        string hash
    );

    function sendFile(address _receiver, string memory _encryptedKey, string memory hash) public {
        // Optionally add a check: require(msg.sender == authorized_sender);
        emit FileSent(_receiver, _encryptedKey, hash);
    }
}