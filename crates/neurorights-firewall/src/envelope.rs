#[derive(Debug, Clone, Copy)]
pub struct NeurorightsEnvelope {
    pub no_exclusion_basic_services: bool,
    pub no_score_from_inner_state: bool,
    pub no_neurocoercion: bool,
    pub revocable_at_will: bool,
    pub ecosocial_benefit_reporting: bool,
}

impl NeurorightsEnvelope {
    /// ALN-derived defaults for neurorights.envelope.citizen.v1
    pub const fn citizen_v1() -> Self {
        Self {
            no_exclusion_basic_services: true,
            no_score_from_inner_state: true,
            no_neurocoercion: true,
            revocable_at_will: true,
            ecosocial_benefit_reporting: true,
        }
    }
}
