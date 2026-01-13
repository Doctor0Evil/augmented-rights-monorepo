pragma circom 2.1.6;

// Minimal placeholder circuit for "has valid charter".
template HasValidCharter() {
    signal input charterHash;
    signal input merkleRoot;
    signal output ok;

    // For now, just pass through; real circuit will include Merkle path and constraints.
    ok <== 1;
}

component main = HasValidCharter();
