use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NeurorightsProfile {
    pub id: String,
    pub version: String,
    pub anchor: String,
}

impl NeurorightsProfile {
    pub fn citizen_v1(anchor: impl Into<String>) -> Self {
        Self {
            id: "neurorights.envelope.citizen.v1".into(),
            version: "1.3".into(),
            anchor: anchor.into(),
        }
    }
}

// Generic helper for PromptEnvelope-like structs.
pub fn attach_neurorights_profile<T>(
    mut envelope: T,
    profile: NeurorightsProfile,
) -> T
where
    T: HasNeurorightsProfile,
{
    envelope.set_neurorights_profile(profile);
    envelope
}

/// Trait to be implemented on your PromptEnvelope type in Cyber-Retrieval.
pub trait HasNeurorightsProfile {
    fn set_neurorights_profile(&mut self, profile: NeurorightsProfile);
}
