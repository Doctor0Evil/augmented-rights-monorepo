// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title HashingLib
/// @notice Helper library for computing charter and DID hashes using keccak256.
library HashingLib {
    function hashCharter(bytes memory charterBytes) internal pure returns (bytes32) {
        return keccak256(charterBytes);
    }

    function hashDid(string memory did) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(did));
    }

    function hashJurisdiction(string memory jurisdiction) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(jurisdiction));
    }
}
