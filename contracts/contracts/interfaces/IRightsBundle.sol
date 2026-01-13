// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IRightsBundle {
    struct RightsBundle {
        uint256 id;
        bytes32 code;
        bytes32 jurisdiction;
        string uri;
        bool active;
    }

    event RightsBundleCreated(
        uint256 indexed id,
        bytes32 indexed code,
        bytes32 indexed jurisdiction,
        string uri
    );

    event RightsBundleUpdated(
        uint256 indexed id,
        string uri,
        bool active
    );

    function createBundle(
        bytes32 code,
        bytes32 jurisdiction,
        string calldata uri
    ) external returns (uint256);

    function updateBundle(
        uint256 id,
        string calldata uri,
        bool active
    ) external;

    function getBundle(uint256 id) external view returns (RightsBundle memory);
}
