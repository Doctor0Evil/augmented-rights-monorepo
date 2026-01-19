use std::marker::PhantomData;
use crate::NeurorightsEnvelope;

/// Marker traits – in your workspace you can seal them if you want.
pub trait NoExclusionBasicServices {}
pub trait NoScoreFromInnerState {}
pub trait NoNeurocoercion {}
pub trait RevocableAtWill {}
pub trait EcosocialBenefitReporting {}

impl NoExclusionBasicServices for NeurorightsEnvelope {}
impl NoScoreFromInnerState for NeurorightsEnvelope {}
impl NoNeurocoercion for NeurorightsEnvelope {}
impl RevocableAtWill for NeurorightsEnvelope {}
impl EcosocialBenefitReporting for NeurorightsEnvelope {}

/// Generic neurorights-bound wrapper.
pub struct NeurorightsBound<T, N>
where
    N: NoExclusionBasicServices
        + NoScoreFromInnerState
        + NoNeurocoercion
        + RevocableAtWill
        + EcosocialBenefitReporting,
{
    inner: T,
    _env: PhantomData<N>,
}

impl<T, N> NeurorightsBound<T, N>
where
    N: NoExclusionBasicServices
        + NoScoreFromInnerState
        + NoNeurocoercion
        + RevocableAtWill
        + EcosocialBenefitReporting,
{
    pub fn new(inner: T) -> Self {
        // Compile-time assertion: envelope must match ALN defaults.
        use static_assertions::const_assert;
        const_assert!(NeurorightsEnvelope::citizen_v1().no_exclusion_basic_services);
        const_assert!(NeurorightsEnvelope::citizen_v1().no_score_from_inner_state);
        const_assert!(NeurorightsEnvelope::citizen_v1().no_neurocoercion);
        const_assert!(NeurorightsEnvelope::citizen_v1().revocable_at_will);
        const_assert!(NeurorightsEnvelope::citizen_v1().ecosocial_benefit_reporting);

        Self {
            inner,
            _env: PhantomData,
        }
    }

    pub fn inner(&self) -> &T {
        &self.inner
    }

    pub fn into_inner(self) -> T {
        self.inner
    }
}
