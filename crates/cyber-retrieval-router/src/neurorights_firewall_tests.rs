use neurorights_firewall::{NeurorightsBound, NeurorightsEnvelope};
use cyber_retrieval_types::PromptEnvelope;

#[allow(dead_code)]
fn _router_signature_proof(
    _env: NeurorightsBound<PromptEnvelope, NeurorightsEnvelope>
) {
    // If PromptEnvelope is not bound correctly, this will not compile.
}
