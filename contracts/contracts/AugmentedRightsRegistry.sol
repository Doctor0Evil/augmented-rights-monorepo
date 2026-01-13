// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./lib/HashingLib.sol";
import "./lib/DidVcLinkLib.sol";
import "./RightsBundles.sol";

/// @title AugmentedRightsRegistry
/// @notice Governance-grade registry anchoring cryptographic commitments of rights charters.
contract AugmentedRightsRegistry {
    using DidVcLinkLib for DidVcLinkLib.Link;

    struct CharterRecord {
        bytes32 charterHash;
        bytes32 subjectDidHash;
        uint256 bundleId;
        bytes32 jurisdiction;
        uint64 issuedAt;
        uint64 revokedAt;
        DidVcLinkLib.Link vcLink;
    }

    RightsBundles public immutable bundles;
    address public immutable admin;

    // charterId is a simple incremental identifier.
    uint256 private _nextCharterId = 1;
    mapping(uint256 => CharterRecord) private _charters;
    mapping(bytes32 => uint256[]) private _bySubject; // subjectDidHash -> charterIds

    event CharterRegistered(
        uint256 indexed charterId,
        bytes32 indexed subjectDidHash,
        uint256 indexed bundleId,
        bytes32 charterHash,
        bytes32 jurisdiction,
        uint64 issuedAt
    );

    event CharterRevoked(
        uint256 indexed charterId,
        uint64 revokedAt
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "ARR: not admin");
        _;
    }

    constructor(address admin_, RightsBundles bundles_) {
        require(admin_ != address(0), "ARR: zero admin");
        require(address(bundles_) != address(0), "ARR: zero bundles");
        admin = admin_;
        bundles = bundles_;
    }

    /// @notice Register a new charter record anchored by a charterHash.
    function registerCharter(
        bytes32 charterHash,
        bytes32 subjectDidHash,
        uint256 bundleId,
        bytes32 jurisdiction,
        bytes32 vcDocumentHash,
        string calldata vcUri
    ) external onlyAdmin returns (uint256) {
        RightsBundles.RightsBundle memory b = bundles.getBundle(bundleId);
        require(b.active, "ARR: inactive bundle");
        require(b.jurisdiction == jurisdiction, "ARR: jurisdiction mismatch");

        uint256 id = _nextCharterId++;
        CharterRecord storage record = _charters[id];

        record.charterHash = charterHash;
        record.subjectDidHash = subjectDidHash;
        record.bundleId = bundleId;
        record.jurisdiction = jurisdiction;
        record.issuedAt = uint64(block.timestamp);
        record.revokedAt = 0;
        record.vcLink = DidVcLinkLib.Link({
            documentHash: vcDocumentHash,
            uri: vcUri
        });

        _bySubject[subjectDidHash].push(id);

        emit CharterRegistered(
            id,
            subjectDidHash,
            bundleId,
            charterHash,
            jurisdiction,
            record.issuedAt
        );

        return id;
    }

    function revokeCharter(uint256 charterId) external onlyAdmin {
        CharterRecord storage record = _charters[charterId];
        require(record.issuedAt != 0, "ARR: not found");
        require(record.revokedAt == 0, "ARR: already revoked");
        record.revokedAt = uint64(block.timestamp);
        emit CharterRevoked(charterId, record.revokedAt);
    }

    function getCharter(uint256 charterId) external view returns (CharterRecord memory) {
        CharterRecord memory record = _charters[charterId];
        require(record.issuedAt != 0, "ARR: not found");
        return record;
    }

    function getChartersBySubject(bytes32 subjectDidHash) external view returns (uint256[] memory) {
        return _bySubject[subjectDidHash];
    }

    function isActive(uint256 charterId) external view returns (bool) {
        CharterRecord memory record = _charters[charterId];
        return record.issuedAt != 0 && record.revokedAt == 0;
    }
}
