import { Layout } from "../components/Layout";
import { ProofGenerator } from "../components/ProofGenerator";
import { ProofVerifier } from "../components/ProofVerifier";

export default function ProofsPage() {
  return (
    <Layout title="Proofs">
      <ProofGenerator />
      <ProofVerifier />
    </Layout>
  );
}
