// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./interfaces/IRightsBundle.sol";

/// @title RightsBundles
/// @notice Registry of reusable rights bundles (neurorights, prosthetics, AI companions).
contract RightsBundles is IRightsBundle {
    address public immutable admin;
    uint256 private _nextId = 1;
    mapping(uint256 => RightsBundle) private _bundles;

    modifier onlyAdmin() {
        require(msg.sender == admin, "RB: not admin");
        _;
    }

    constructor(address admin_) {
        require(admin_ != address(0), "RB: zero admin");
        admin = admin_;
    }

    function createBundle(
        bytes32 code,
        bytes32 jurisdiction,
        string calldata uri
    ) external override onlyAdmin returns (uint256) {
        uint256 id = _nextId++;
        _bundles[id] = RightsBundle({
            id: id,
            code: code,
            jurisdiction: jurisdiction,
            uri: uri,
            active: true
        });

        emit RightsBundleCreated(id, code, jurisdiction, uri);
        return id;
    }

    function updateBundle(
        uint256 id,
        string calldata uri,
        bool active
    ) external override onlyAdmin {
        RightsBundle storage b = _bundles[id];
        require(b.id != 0, "RB: not found");
        b.uri = uri;
        b.active = active;
        emit RightsBundleUpdated(id, uri, active);
    }

    function getBundle(uint256 id) external view override returns (RightsBundle memory) {
        RightsBundle memory b = _bundles[id];
        require(b.id != 0, "RB: not found");
        return b;
    }
}
