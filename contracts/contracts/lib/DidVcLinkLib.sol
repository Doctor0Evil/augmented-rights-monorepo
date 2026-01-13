// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title DidVcLinkLib
/// @notice Lightweight linkage between on-chain records and off-chain DID/VC documents.
library DidVcLinkLib {
    struct Link {
        // Hash of an off-chain VC or DID Document, if anchored.
        bytes32 documentHash;
        // Optional URI to resolve additional metadata (e.g., VC status list or schema).
        string uri;
    }
}
